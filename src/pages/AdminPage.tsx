import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantAPI } from '../services/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { CreateRestaurantInput, Restaurant, RestaurantFormValues, UpdateRestaurantInput } from '../types';

const Container = styled.div`
  padding: 2rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`;

const Panel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  th, td { border-bottom: 1px solid #eee; padding: 0.5rem; text-align: left; }
  th { background: #fafafa; }
  tr:hover { background: #fafafa; }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  &:hover { background: #f5f5f5; }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    background: #f0f0f0;
  }
`;

const Danger = styled(Button)`
  color: #ff4757;
  border-color: #ffb3ba;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

// 입력칸과 같은 열(2열)에 표시해 어떤 항목이 잘못됐는지 바로 보이게 합니다.
const ErrorText = styled.p`
  grid-column: 2;
  margin: 0;
  color: #d32f2f;
  font-size: 0.85rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-height: 80px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

// 서버는 실패 사유를 { error: { message } } 형태로 돌려줍니다.
function getErrorMessage(error: unknown): string {
  const response = (error as { response?: { data?: { error?: { message?: string } } } })?.response;
  const serverMessage = response?.data?.error?.message;
  if (typeof serverMessage === 'string' && serverMessage) return serverMessage;
  if (error instanceof Error) return error.message;
  return '알 수 없는 오류가 발생했습니다.';
}

function AdminPage() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Restaurant | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: restaurantAPI.getRestaurants,
  });

  const restaurants = data?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<RestaurantFormValues>();

  const createMutation = useMutation({
    mutationFn: restaurantAPI.createRestaurant,
    onSuccess: () => {
      toast.success('생성 완료');
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      reset();
    },
    onError: (error) => {
      toast.error(`생성 실패: ${getErrorMessage(error)}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: Restaurant['id']; payload: UpdateRestaurantInput }) =>
      restaurantAPI.updateRestaurant(id, payload),
    onSuccess: () => {
      toast.success('수정 완료');
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
    onError: (error) => {
      toast.error(`수정 실패: ${getErrorMessage(error)}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: restaurantAPI.deleteRestaurant,
    onSuccess: () => {
      toast.info('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      if (selected?.id) setSelected(null);
    },
    onError: (error) => {
      toast.error(`삭제 실패: ${getErrorMessage(error)}`);
    },
  });

  const onEdit = (row: Restaurant) => {
    setSelected(row);
    setValue('name', row.name);
    setValue('category', row.category);
    setValue('location', row.location);
    setValue('priceRange', row.priceRange || '');
    setValue('rating', row.rating ?? 0);
    setValue('description', row.description || '');
    setValue('recommendedMenu', (row.recommendedMenu || []).join(', '));
    setValue('image', row.image || '');
  };

  const onResetForm = () => {
    setSelected(null);
    reset();
  };

  const onSubmit = async (form: RestaurantFormValues) => {
    const recommendedMenu = typeof form.recommendedMenu === 'string'
      ? form.recommendedMenu.split(/[\n,]/).map((s) => s.trim()).filter(Boolean)
      : [];

    const payload: CreateRestaurantInput = {
      name: form.name?.trim(),
      category: form.category,
      location: form.location?.trim(),
      priceRange: form.priceRange?.trim() || undefined,
      rating: form.rating !== '' && form.rating !== undefined ? Number(form.rating) : 0,
      description: form.description?.trim() || undefined,
      recommendedMenu,
      image: form.image?.trim() || undefined,
    };

    // 실패는 각 mutation의 onError가 토스트로 알리므로 여기서는 전파만 막습니다.
    try {
      if (selected?.id) {
        await updateMutation.mutateAsync({ id: selected.id, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
    } catch {
      // onError에서 처리 완료
    }
  };

  const onDelete = async (row: Restaurant) => {
    if (!confirm(`[삭제] ${row.name}을(를) 삭제할까요?`)) return;
    try {
      await deleteMutation.mutateAsync(row.id);
    } catch {
      // onError에서 처리 완료
    }
  };

  const categories = useMemo(() => ['한식','중식','일식','양식','아시안','분식','카페','기타'], []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <Container>
      <Title>관리자 - 레스토랑 관리</Title>
      <Grid>
        <Panel>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>이름</th>
                <th>카테고리</th>
                <th>평점</th>
                <th>위치</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.category}</td>
                  <td>{r.rating}</td>
                  <td>{r.location}</td>
                  <td>
                    <Actions>
                      <Button disabled title="이번 주 서버는 수정 API를 제공하지 않습니다." onClick={() => onEdit(r)}>수정</Button>
                      <Danger disabled title="이번 주 서버는 삭제 API를 제공하지 않습니다." onClick={() => onDelete(r)}>삭제</Danger>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>

        <Panel>
          <h3>{selected ? `수정: ${selected.name}` : '새 레스토랑 추가'}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <label htmlFor="name">이름 *</label>
              <Input id="name" {...register('name', { required: '이름은 필수입니다' })} />
              {errors.name && <ErrorText role="alert">{errors.name.message}</ErrorText>}
            </FormRow>
            <FormRow>
              <label htmlFor="category">카테고리 *</label>
              <Select id="category" {...register('category', { required: '카테고리는 필수입니다' })}>
                <option value="">선택</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
              {errors.category && <ErrorText role="alert">{errors.category.message}</ErrorText>}
            </FormRow>
            <FormRow>
              <label htmlFor="location">위치 *</label>
              <Input id="location" {...register('location', { required: '위치는 필수입니다' })} />
              {errors.location && <ErrorText role="alert">{errors.location.message}</ErrorText>}
            </FormRow>
            <FormRow>
              <label htmlFor="priceRange">가격대</label>
              <Input id="priceRange" {...register('priceRange')} />
            </FormRow>
            <FormRow>
              <label htmlFor="rating">평점</label>
              <Input id="rating" type="number" step="0.01" min="0" max="5" {...register('rating')} />
            </FormRow>
            <FormRow>
              <label htmlFor="recommendedMenu">추천 메뉴</label>
              <Textarea id="recommendedMenu" {...register('recommendedMenu')} placeholder="쉼표 또는 줄바꿈으로 구분" />
            </FormRow>
            <FormRow>
              <label htmlFor="image">이미지 URL</label>
              <Input id="image" {...register('image')} />
            </FormRow>
            <FormRow>
              <label htmlFor="description">설명</label>
              <Textarea id="description" {...register('description')} />
            </FormRow>
            <Actions>
              <Button type="submit" disabled={isSubmitting}>{selected ? '수정' : '생성'}</Button>
              <Button type="button" onClick={onResetForm}>초기화</Button>
            </Actions>
          </form>
        </Panel>
      </Grid>
    </Container>
  );
}

export default AdminPage;


