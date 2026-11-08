# 🍜 PWD Week 7 Client - Ajou Campus Foodmap

> **2026년 2학기 실전 웹서비스 개발**: 5주차에 만든 React 클라이언트를 7주차 Supabase 기반 Express API와 연동해 Vercel에 배포합니다.

## 🎯 프로젝트 소개

**아주 캠퍼스 푸드맵** - 아주대학교 주변 맛집을 소개하고 제보받는 커뮤니티 서비스

### 데이터가 저장되는 위치

| 기능 | 저장 위치 |
|---|---|
| 맛집 목록·상세·인기 조회 | Express API → **Supabase PostgreSQL** |
| 맛집 등록 (`POST /api/restaurants`) | Express API → **Supabase PostgreSQL** |
| 제보 작성·조회·승인 상태·삭제 | **브라우저 LocalStorage** |
| 좋아요 | **브라우저 LocalStorage** |
| 맛집 수정·삭제 | 서버에 해당 API 없음 → 관리자 버튼 비활성 |

제보는 LocalStorage에 쌓이고, `#/submissions`에서 **승인**할 때 비로소 서버의 맛집 등록 API를 호출합니다.

### 연동 구조

```
브라우저 → VITE_API_BASE_URL (Render의 Express)
        → Supabase JS SDK → Data API(HTTPS)
        → PostgreSQL public.restaurants
```

### 사용 기술
- **Frontend**: React 19 + TypeScript (strict 모드)
- **Vite**: Build Tool
- **Routing**: React Router v7 (HashRouter)
- **Styling**: Emotion (CSS-in-JS)
- **Forms**: React Hook Form
- **Server State**: React Query (TanStack Query)
- **HTTP**: axios
- **Deployment**: Vercel

### 환경변수

| 이름 | 값 | 비고 |
|---|---|---|
| `VITE_API_BASE_URL` | Express 서버의 기본 URL | 끝에 `/api/restaurants`를 붙이지 않음 |

로컬은 루트의 `.env.local`, 배포는 Vercel 프로젝트의 Environment Variables에 등록합니다.
Vite의 `VITE_*` 값은 **빌드 시점에 번들로 들어가므로**, 값을 바꾸면 개발 서버 재시작 또는 재배포가 필요합니다.

> ⚠️ Supabase Secret key는 서버 전용입니다. `VITE_*` 변수에 절대 넣지 마세요. 브라우저 번들에 그대로 노출됩니다.

### 관련 저장소
- 백엔드 서버: [`pwd-week7`](https://github.com/EnENseong/pwd-week7)

---

<details>
<summary>📚 5주차 실습 가이드 (원본)</summary>

아래는 이 프로젝트를 처음 만들 때 사용한 5주차 강의 자료입니다.

- [5주차 강의자료](https://ajou-hyunseok-oh.github.io/pwd-2026-2/)

---

## ✅ 사전 준비사항

### 1. 필수 프로그램 설치

#### Node.js 설치 확인
```bash
# Node.js 버전 확인 (24.x LTS 사용)
node --version

# npm 버전 확인 (Node.js 24에 포함된 npm 사용)
npm --version
```

> ⚠️ Node.js가 없다면 [nodejs.org](https://nodejs.org)에서 24.x LTS 버전을 다운로드하세요.

검증 환경: Node.js 24.21.0 / npm 11.20.0 (2026년 10월 12일). 명령 예제는 macOS·Linux 터미널 또는 Windows의 Git Bash를 기준으로 합니다.

#### Git 설치 확인
```bash
# Git 버전 확인
git --version
```

> ⚠️ Git이 없다면 [git-scm.com](https://git-scm.com)에서 다운로드하세요.

### 2. 계정 준비
- ✅ [GitHub 계정](https://github.com) (코드 저장용)
- ✅ [Vercel 계정](https://vercel.com) (배포용 - GitHub 계정으로 가입 권장)

### 3. 에디터 준비
- 📝 [VS Code](https://code.visualstudio.com) 권장
- 추천 확장 프로그램:  
  - Prettier: 코드 스타일을 자동으로 정리하여 일관된 형식을 유지
  - Auto Rename Tag: HTML/XML 태그의 시작 또는 종료 태그를 수정하면 자동으로 짝 태그도 함께 변경

---

## 🚀 프로젝트 시작하기

**아래 두 경로 중 하나만 선택합니다.** 직접 코드를 작성하는 수업 실습은 A 경로를 사용합니다.

| 경로 | 진행 순서 | 접속 주소 예시 |
| --- | --- | --- |
| A. 처음부터 구현 | A-1 프로젝트 생성 → A-2 GitHub 연동 → 라이브러리·설정 적용 → 코드 예제 작성 → Vercel 배포 | `/list`, `/submit` |
| B. 완성 저장소 실행 | 본인 계정으로 Fork → clone → `npm ci` → 실행·검증 → Vercel 배포 | `/#/list`, `/#/submit` |

README 예제는 `BrowserRouter`, 완성 저장소는 `HashRouter`를 사용하므로 주소가 다릅니다. 완성 저장소에는 관리자 화면도 추가되어 있습니다.

### B. 완성 저장소 실행하기

GitHub에서 이 저장소를 본인 계정으로 Fork합니다. 아래 `YOUR_GITHUB_ID`를 본인 GitHub 아이디로 바꾸고, 프로젝트를 둘 상위 폴더에서 실행합니다. 이미 복제했다면 해당 폴더로 이동해 `npm ci`부터 실행합니다.

```bash
git clone https://github.com/YOUR_GITHUB_ID/pwd-week5.git
cd pwd-week5
npm ci
npm run dev
```

개발 서버는 터미널을 계속 사용합니다. 다음 검증 명령은 **같은 프로젝트 폴더의 새 터미널**에서 실행하거나, 서버를 `Ctrl+C`로 종료한 후 실행합니다.

```bash
npm run typecheck  # 앱과 설정 파일의 타입 검사
npm run lint       # TypeScript·React 코드 검사
npm run build      # 타입 검사 후 dist 빌드
```

화면 컴포넌트는 `.tsx`, 일반 로직과 설정 파일은 `.ts`를 사용합니다. `tsconfig.app.json`은 브라우저 코드를, `tsconfig.node.json`은 Vite·ESLint 설정을 검사합니다. [Vite는 타입 검사를 별도로 실행해야 하므로](https://vite.dev/guide/features.html#typescript), `build`에 `tsc -b`를 포함했습니다.

B 경로는 아래 A-1·A-2와 코드 예제 복사를 생략하고 **Vercel 배포**로 이동합니다. `npm ci`는 포함된 lockfile의 버전을 재현합니다. [npm ci 문서](https://docs.npmjs.com/cli/v11/commands/npm-ci/)

### A-1. React + TypeScript + Vite 프로젝트 개발환경 구축

```bash
# 새 프로젝트 폴더 생성 (이미 존재하는 프로젝트에서는 다시 실행하지 않음)
mkdir pwd-week5

# 프로젝트 폴더로 이동
cd pwd-week5

# React + TypeScript + SWC 템플릿 생성 (실습 설정과 일치하는 버전)
npm create vite@7.1.2 . -- --template react-swc-ts

# 의존성 설치 및 개발 서버 실행
npm install
npm run dev
```

> 💡 터미널에 표시된 주소(기본 http://localhost:5173)를 열면 됩니다. 처음에는 Vite 기본 화면이 표시되며, 아래 핵심 컴포넌트 구현을 적용하면 맛집 화면으로 바뀝니다. 확인을 마쳤으면 `Ctrl+C`로 서버를 종료한 뒤 다음 단계로 진행합니다.

### A-2. 프로젝트 GitHub 저장소 연동

GitHub에서 본인 소유의 **빈** `pwd-week5` 저장소를 만듭니다. 생성 시 README·라이선스·`.gitignore`를 추가하지 않습니다. 아래 `YOUR_GITHUB_ID`는 본인 아이디로 바꿉니다. [GitHub의 로컬 프로젝트 업로드 안내](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)

터미널의 현재 폴더가 `package.json`이 있는 `pwd-week5`인지 확인합니다. 커밋할 때 사용자 정보 오류가 나면 `git config user.name "본인 이름"`, `git config user.email "GitHub에 등록한 이메일"`로 이 저장소의 작성자를 설정합니다.

```bash
# 현재 폴더를 Git 저장소(Repository)로 초기화(Initialize)
git init

# 모든 변경 파일을 스테이징(Staging Area)에 추가
git add .

# 스테이징된 파일을 커밋(Commit)으로 기록 (-m: 메시지(Message) 옵션)
git commit -m "Init pwd-week5 : React + Vite app"

# 기본 브랜치(Branch) 이름을 main으로 변경 (-m: move)
git branch -m main

# 원격(Remote) 저장소 'origin' 등록 (GitHub URL로 연결)
git remote add origin https://github.com/YOUR_GITHUB_ID/pwd-week5.git

# 로컬 main을 원격 origin/main으로 최초 푸시(Push) (-u: 업스트림(Upstream) 설정)
#  → 이후에는 git push 만으로도 동일 브랜치에 푸시 가능
git push -u origin main
```

이후 코드 수정 사항도 커밋·push해야 GitHub와 Vercel에 반영됩니다.
```bash
git add .

git commit -m "....."

git push -u origin main
```

---

## 📦 주요 라이브러리 설치
### 각 라이브러리 설명

| 라이브러리 | 용도 | 버전 |
|-----------|------|------|
| react-dom | DOM 렌더링 | ^19.1.1 |
| react-router-dom | 페이지 라우팅 | ^7.9.1 |
| axios | 후속 HTTP 통신 실습용; 현재 예제에서는 사용하지 않음 | ^1.12.1 |
| react-hook-form | 폼 관리 | ^7.62.0 |
| @emotion/react | CSS-in-JS | ^11.14.0 |
| @emotion/styled | 스타일 컴포넌트 | ^11.14.1 |
| @tanstack/react-query | 비동기 데이터와 캐시 관리 | ^5.87.4 |
| typescript | 정적 타입 검사 | ~5.9.3 |
| react-icons | 아이콘 | ^5.5.0 |
| react-toastify | 알림 메시지 | ^11.0.5 |
| react-spinners | 로딩 애니메이션 | ^0.17.0 |
---

A 경로에서는 프로젝트 루트의 **`package.json` 전체 내용을 아래 JSON으로 교체**합니다. 코드 블록을 감싼 백틱 표시는 파일에 포함하지 않습니다.

`package.json`

```json
{
  "name": "pwd-week5",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "typecheck": "tsc -b",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@tanstack/react-query": "^5.87.4",
    "axios": "^1.12.1",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-hook-form": "^7.62.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.1",
    "react-spinners": "^0.17.0",
    "react-toastify": "^11.0.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@types/node": "^24.19.2",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react-swc": "^4.0.0",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "jiti": "^2.7.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.71.1",
    "vite": "^7.1.2"
  },
  "engines": {
    "node": "24.x"
  }
}
```

### 한 번에 모두 설치하기

A 경로는 `package.json`을 교체한 뒤 아래 명령을 다시 실행합니다. 이때 생성·갱신되는 `package-lock.json`도 함께 Git에 기록합니다. `^`가 붙은 버전은 호환 범위 내에서 갱신되므로 B 경로의 고정 버전과 다를 수 있습니다. 이후 같은 프로젝트를 다시 설치할 때는 `npm ci`를 사용합니다.

```bash
npm install
```

다음 다섯 설정 파일도 각 링크의 **전체 내용**으로 프로젝트 루트에 생성하거나 덮어씁니다.

| 파일 | 역할 |
| --- | --- |
| [tsconfig.json](tsconfig.json) | 앱·설정 파일의 타입 검사 연결 |
| [tsconfig.app.json](tsconfig.app.json) | 브라우저 코드의 엄격한 타입 검사 |
| [tsconfig.node.json](tsconfig.node.json) | Vite·ESLint 설정의 타입 검사 |
| [vite.config.ts](vite.config.ts) | React SWC 빌드 플러그인 |
| [eslint.config.ts](eslint.config.ts) | TypeScript·React 린트 |

템플릿이 생성한 `eslint.config.js`는 삭제하고 `eslint.config.ts`만 둡니다. 두 파일이 동시에 있으면 JavaScript 설정이 먼저 선택됩니다. TypeScript로 작성한 ESLint 설정을 읽는 데 필요한 `jiti`도 위 개발 의존성에 포함되어 있습니다. [ESLint 설정 문서](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files)

---

## 📁 프로젝트 구조

### 폴더 구조 생성

```bash
# src 폴더 안에 필요한 폴더들 생성
mkdir -p src/components src/pages src/services src/styles src/types
```

### 최종 구조

```
pwd-week5/
├── src/
│   ├── components/         # 재사용 컴포넌트
│   │   ├── Header.tsx
│   │   ├── NotFound.tsx
│   │   ├── PopularRestaurants.tsx
│   │   ├── RestaurantCard.tsx
│   │   ├── RestaurantList.tsx
│   │   └── SubmitRestaurant.tsx
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── AdminPage.tsx
│   │   ├── SubmissionsPage.tsx
│   │   ├── DetailPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ListPage.tsx
│   │   ├── PopularPage.tsx
│   │   └── SubmitPage.tsx
│   ├── services/          # API 로직
│   │   ├── api.ts
│   │   ├── storage.ts
│   │   └── validation.ts
│   ├── types/            # 공통 데이터·폼·API 타입
│   │   └── index.ts
│   ├── styles/            # 스타일
│   │   └── GlobalStyles.tsx
│   ├── App.css           # 기본 스타일
│   ├── App.tsx            # 메인 앱
│   ├── index.css         # 기본 스타일
│   └── main.tsx          # 진입점
├── .gitignore
├── index.html            # 앱 진입 HTML
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.ts
├── vite.config.ts
├── vercel.json           # 배포 전 추가할 SPA 라우팅 설정
└── README.md
```

---

## 🔧 핵심 컴포넌트 구현

A 경로에서 각 코드 블록 위의 파일명 또는 첫 줄 주석의 경로에 맞춰 파일을 만듭니다. 이미 있는 `main.tsx`, `App.tsx`, CSS, `index.html`은 전체 내용을 교체합니다. 모든 파일을 작성한 뒤 `npm run typecheck`, `npm run lint`, `npm run dev` 순서로 확인합니다. 초기 맛집은 3개이며 인기 화면은 평점순으로 최대 5개를 표시합니다.

### 0. 공통 타입과 저장 데이터 검증

폼에서는 추천 메뉴를 문자열로 입력하고, API에는 문자열 배열로 전달합니다. `EntityId`는 초기 데이터의 숫자 ID와 새 데이터의 UUID를 모두 지원합니다. LocalStorage의 JSON은 `unknown`으로 읽고 실제 구조를 검증합니다.

```ts
/* src/types/index.ts */
// 초기 맛집의 숫자 ID와 새로 생성하는 UUID를 함께 지원합니다.
export type EntityId = number | string;

export interface Restaurant {
  id: EntityId;
  name: string;
  category: string;
  location: string;
  priceRange?: string;
  rating: number;
  description?: string;
  recommendedMenu: string[];
  likes: number;
  image?: string;
}

export type CreateRestaurantInput = Omit<Restaurant, 'id' | 'likes' | 'rating' | 'recommendedMenu'> & {
  rating?: number;
  recommendedMenu?: string[];
};

export type UpdateRestaurantInput = Partial<CreateRestaurantInput>;

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface CreateSubmissionInput {
  restaurantName: string;
  category: string;
  location: string;
  priceRange?: string;
  recommendedMenu?: string[];
  review?: string;
  submitterName?: string;
  submitterEmail?: string;
}

export interface Submission extends CreateSubmissionInput {
  id: EntityId;
  status: SubmissionStatus;
}

export type UpdateSubmissionInput = Partial<Omit<Submission, 'id'>>;

export interface ApiResponse<T> {
  data: T;
}

// 폼의 메뉴 입력은 문자열이고, API에 전달할 때 문자열 배열로 변환합니다.
export interface RestaurantFormValues {
  name: string;
  category: string;
  location: string;
  priceRange: string;
  rating: string | number;
  description: string;
  recommendedMenu: string;
  image: string;
}

export interface SubmissionFormValues {
  restaurantName: string;
  category: string;
  location: string;
  priceRange: string;
  recommendedMenu: string;
  review: string;
  submitterName: string;
  submitterEmail: string;
}
```

```ts
/* src/services/storage.ts */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// JSON은 실행 시 검증해야 TypeScript 타입과 실제 저장 데이터가 일치합니다.
export function readStoredValue<T>(
  key: string,
  isValid: (value: unknown) => value is T,
  fallback: T,
): T {
  const saved = localStorage.getItem(key);
  if (saved === null) return structuredClone(fallback);
  const value: unknown = JSON.parse(saved);
  if (!isValid(value)) throw new Error('저장된 실습 데이터 형식을 확인해주세요.');
  return value;
}
```

```ts
/* src/services/validation.ts */
import type { EntityId, Restaurant, Submission } from '../types';
import { isRecord } from './storage';

export function isEntityId(value: unknown): value is EntityId {
  return typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item: unknown) => typeof item === 'string');
}

function hasOptionalStrings(value: Record<string, unknown>, keys: string[]): boolean {
  return keys.every((key) => value[key] === undefined || typeof value[key] === 'string');
}

export function isRestaurant(value: unknown): value is Restaurant {
  return isRecord(value)
    && isEntityId(value.id)
    && typeof value.name === 'string'
    && typeof value.category === 'string'
    && typeof value.location === 'string'
    && typeof value.rating === 'number' && Number.isFinite(value.rating)
    && typeof value.likes === 'number' && Number.isFinite(value.likes)
    && isStringArray(value.recommendedMenu)
    && hasOptionalStrings(value, ['priceRange', 'description', 'image']);
}

export function isSubmission(value: unknown): value is Submission {
  return isRecord(value)
    && isEntityId(value.id)
    && typeof value.restaurantName === 'string'
    && typeof value.category === 'string'
    && typeof value.location === 'string'
    && (value.status === 'pending' || value.status === 'approved' || value.status === 'rejected')
    && (value.recommendedMenu === undefined || isStringArray(value.recommendedMenu))
    && hasOptionalStrings(value, ['priceRange', 'review', 'submitterName', 'submitterEmail']);
}

export function isLikedRestaurants(value: unknown): value is EntityId[] {
  return Array.isArray(value) && value.every(isEntityId);
}

export function isRestaurantLikes(value: unknown): value is Record<string, number> {
  return isRecord(value)
    && Object.values(value).every((count) => typeof count === 'number' && Number.isFinite(count));
}
```

### 1. index.html 수정

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="캠퍼스 주변 맛집을 찾아보세요!" />
    <title>Ajou Campus Foodmap - 우리 학교 맛집 지도</title>
  </head>
  <body>
    <noscript>이 앱을 실행하려면 JavaScript를 활성화해야 합니다.</noscript>    
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

### 2. 메인 앱 구조
```tsx
/* src/main.tsx */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const root = document.getElementById('root')
if (!root) throw new Error('앱을 표시할 root 요소를 찾을 수 없습니다.')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

```tsx
/* src/App.tsx */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import PopularPage from './pages/PopularPage';
import SubmitPage from './pages/SubmitPage';

// Components
import Header from './components/Header';
import NotFound from './components/NotFound';

// Styles
import GlobalStyles from './styles/GlobalStyles';

// React Query Client 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyles />
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/restaurant/:id" element={<DetailPage />} />
              <Route path="/popular" element={<PopularPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2026 Ajou Campus Foodmap | Made with React</p>
          </footer>
        </div>
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
```

### 3. 스타일(CSS)
- 전체 애플리케이션 (src/index.css)
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

- App 컴포넌트와 하위 컴포넌트(src/App.css)
```css
/* 기본 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: #f5f5f5;
  color: #333;
}

/* 레이아웃 */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

@media (max-width: 600px) {
  .main-content {
    padding: 1rem;
  }
}

/* 기본 버튼 스타일 */
button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background: #f0f0f0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 기본 폼 스타일 */
input, select, textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

/* 푸터 */
.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

/* 로딩 */
.loading {
  text-align: center;
  padding: 2rem;
}

/* 에러 */
.error {
  color: red;
  padding: 1rem;
  text-align: center;
}
```

- @emotion 패키지를 이용한 전역 스타일 적용(src/styles/GlobalStyles.tsx)
```tsx
/* src/styles/GlobalStyles.tsx */
/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      /* Emotion으로 관리할 글로벌 스타일 */
      a {
        color: inherit;
        text-decoration: none;
      }
      
      ul {
        list-style: none;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
    `}
  />
);

export default GlobalStyles;
```


### 4. 가상 맛집 데이터와 LocalStorage API (src/services/api.ts)
```ts
/* src/services/api.ts */
import type {
  ApiResponse,
  CreateRestaurantInput,
  CreateSubmissionInput,
  EntityId,
  Restaurant,
  Submission,
  SubmissionStatus,
  UpdateRestaurantInput,
  UpdateSubmissionInput,
} from '../types';
import { readStoredValue } from './storage';
import { isRestaurant, isSubmission } from './validation';

// 이번 실습은 백엔드 없이 동작합니다. 초기 데이터는 README의 가상 맛집입니다.
const initialRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "송림식당",
    category: "한식",
    location: "경기 수원시 영통구 월드컵로193번길 21 원천동",
    priceRange: "7,000-13,000원",
    rating: 4.99,
    description: "맛있는 한식 맛집입니다.",
    recommendedMenu: ["순두부", "김치찌개","소불고기", "제육볶음"],
    likes: 0,
    image: "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MTJfODEg/MDAxNjU0OTYzNTM3MjE1.1BfmrmOsz_B6DBHAnhQSs6qfNIDnssofR-DrzMfigIIg.JHHDheG6ifJjtfKUqLss_mLXWFE9fNJ5BmepNUVXSOog.PNG.cary63/image.png?type=w966"
  },
  {
    id: 2,
    name: "별미떡볶이",
    category: "분식",
    location: "경기 수원시 영통구 아주로 42 아카데미빌딩",
    priceRange: "7,000-10,000원",
    rating: 4.98,
    description: "바삭한 튀김과 함께하는 행복한 한입",
    recommendedMenu: ["떡볶이", "튀김", "순대", "어묵"],
    likes: 0,
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MTJfMjcg%2FMDAxNzU0OTQ5ODk1Mjg0.GR6i3mNpJJXyqQrozGEJ65InCDBGlEmxc0aCeVHncJgg.sduDPX67J8hhoGxq4vLohpS4dXk1w-706dQLPfVs1iwg.JPEG%2Foutput%25A3%25DF1564208956.jpg"
  },
  {
    id: 3,
    name: "Sogo",
    category: "일식",
    location: "경기 수원시 영통구 월드컵로193번길 7",
    priceRange: "10,000-16,000원",
    rating: 4.89,
    description: "일식 맛집, 구 허수아비,",
    recommendedMenu: ["냉모밀", "김치돈까스나베", "코돈부르"],
    likes: 0,
    image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190707_63%2F1562462598960nPDMy_JPEG%2FW7iKQEhTMzCF3flC1t0pzgzF.jpeg.jpg"
  }
];

const RESTAURANTS_KEY = 'pwd-week5-restaurants';
const SUBMISSIONS_KEY = 'pwd-week5-submissions';

function readItems<T>(key: string, isItem: (value: unknown) => value is T, fallback: T[] = []): T[] {
  return readStoredValue(key, (value): value is T[] =>
    Array.isArray(value) && value.every(isItem), fallback);
}

function writeItems<T>(key: string, items: T[]): void {
  // 저장 실패는 호출자에게 전달하여 성공 메시지가 표시되지 않도록 합니다.
  localStorage.setItem(key, JSON.stringify(items));
}

function updateItem<T extends { id: EntityId }>(
  key: string,
  id: EntityId,
  payload: Partial<Omit<T, 'id'>>,
  isItem: (value: unknown) => value is T,
  fallback: T[] = [],
): ApiResponse<T> {
  const items = readItems(key, isItem, fallback);
  const index = items.findIndex((item) => String(item.id) === String(id));
  const original = items[index];
  if (!original) throw new Error('항목을 찾을 수 없습니다.');
  const updated = { ...original, ...payload, id: original.id };
  if (!isItem(updated)) throw new Error('수정할 데이터 형식을 확인해주세요.');
  items[index] = updated;
  writeItems(key, items);
  return { data: updated };
}

function deleteItem<T extends { id: EntityId }>(
  key: string,
  id: EntityId,
  isItem: (value: unknown) => value is T,
  fallback: T[] = [],
): number {
  const items = readItems(key, isItem, fallback);
  writeItems(key, items.filter((item) => String(item.id) !== String(id)));
  return 204;
}

// 기존 페이지가 사용하는 비동기 인터페이스와 { data: ... } 응답을 유지합니다.
export const restaurantAPI = {
  getRestaurants: async (): Promise<ApiResponse<Restaurant[]>> => ({
    data: readItems(RESTAURANTS_KEY, isRestaurant, initialRestaurants),
  }),

  getRestaurantById: async (id: EntityId): Promise<ApiResponse<Restaurant | undefined>> => ({
    data: readItems(RESTAURANTS_KEY, isRestaurant, initialRestaurants)
      .find((item) => String(item.id) === String(id)),
  }),

  getPopularRestaurants: async (): Promise<ApiResponse<Restaurant[]>> => ({
    data: readItems(RESTAURANTS_KEY, isRestaurant, initialRestaurants)
      .sort((a, b) => b.rating - a.rating).slice(0, 5),
  }),

  createRestaurant: async (payload: CreateRestaurantInput): Promise<ApiResponse<Restaurant>> => {
    const items = readItems(RESTAURANTS_KEY, isRestaurant, initialRestaurants);
    const item: Restaurant = {
      ...payload,
      id: crypto.randomUUID(),
      rating: payload.rating ?? 0,
      recommendedMenu: payload.recommendedMenu ?? [],
      likes: 0,
    };
    writeItems(RESTAURANTS_KEY, [...items, item]);
    return { data: item };
  },

  updateRestaurant: async (id: EntityId, payload: UpdateRestaurantInput): Promise<ApiResponse<Restaurant>> =>
    updateItem(RESTAURANTS_KEY, id, {
      ...payload,
      ...('rating' in payload ? { rating: payload.rating ?? 0 } : {}),
      ...('recommendedMenu' in payload ? { recommendedMenu: payload.recommendedMenu ?? [] } : {}),
    }, isRestaurant, initialRestaurants),

  deleteRestaurant: async (id: EntityId): Promise<number> =>
    deleteItem(RESTAURANTS_KEY, id, isRestaurant, initialRestaurants),
};

export const submissionAPI = {
  createSubmission: async (payload: CreateSubmissionInput): Promise<ApiResponse<Submission>> => {
    const items = readItems(SUBMISSIONS_KEY, isSubmission);
    const item: Submission = { ...payload, id: crypto.randomUUID(), status: 'pending' };
    writeItems(SUBMISSIONS_KEY, [...items, item]);
    return { data: item };
  },

  listSubmissions: async (status?: SubmissionStatus): Promise<ApiResponse<Submission[]>> => ({
    data: readItems(SUBMISSIONS_KEY, isSubmission).filter((item) => !status || item.status === status),
  }),

  updateSubmission: async (id: EntityId, payload: UpdateSubmissionInput): Promise<ApiResponse<Submission>> =>
    updateItem(SUBMISSIONS_KEY, id, payload, isSubmission),

  deleteSubmission: async (id: EntityId): Promise<number> =>
    deleteItem(SUBMISSIONS_KEY, id, isSubmission),
};

export default restaurantAPI;
```
---

### 5. 컴포넌트 (src/components/)

```tsx
/* src/components/Header.tsx */
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaHome, FaList, FaFire, FaPlus } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 0.5rem;
  max-width: 600px;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.3);
  }
`;

function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <HeaderContainer>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Ajou Campus Foodmap
      </h1>
      <Nav>
        <NavLink to="/" className={isActive('/')}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/list" className={isActive('/list')}>
          <FaList /> List
        </NavLink>
        <NavLink to="/popular" className={isActive('/popular')}>
          <FaFire /> Popular
        </NavLink>
        <NavLink to="/submit" className={isActive('/submit')}>
          <FaPlus /> Submit New restaurant
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
```

```tsx
/* src/components/NotFound.tsx */
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaExclamationTriangle } from 'react-icons/fa';

const Container = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const Icon = styled(FaExclamationTriangle)`
  font-size: 4rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border-radius: 8px;
  transition: background 0.3s;
  
  &:hover {
    background: #5a67d8;
  }
`;

function NotFound() {
  return (
    <Container>
      <Icon />
      <Title>404 - 페이지를 찾을 수 없습니다</Title>
      <Message>요청하신 페이지가 존재하지 않습니다.</Message>
      <HomeLink to="/">홈으로 돌아가기</HomeLink>
    </Container>
  );
}

export default NotFound;
```

```tsx
/* src/components/PopularRestaurants.tsx */
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaTrophy, FaStar } from 'react-icons/fa';
import type { Restaurant } from '../types';

interface PopularRestaurantsProps {
  restaurants: Restaurant[];
}

const Container = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;

const RankingList = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
`;

const RankingItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.3s;
  
  &:hover {
    background: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const RankBadge = styled.div`
  font-size: 1.5rem;
  width: 50px;
  text-align: center;
  
  svg {
    font-size: 1.5rem;
  }
`;

const RestaurantInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
  
  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
`;

function PopularRestaurants({ restaurants }: PopularRestaurantsProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 0) return <FaTrophy color="gold" />;
    if (rank === 1) return <FaTrophy color="silver" />;
    if (rank === 2) return <FaTrophy color="#CD7F32" />;
    return rank + 1;
  };

  return (
    <Container>
      <Title>🔥 이번 주 인기 TOP 5</Title>
      
      <RankingList>
        {restaurants.map((restaurant, index) => (
          <RankingItem key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
            <RankBadge>{getRankIcon(index)}</RankBadge>
            <RestaurantInfo>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.category} • {restaurant.location}</p>
            </RestaurantInfo>
            <Rating>
              <FaStar color="gold" />
              {restaurant.rating}
            </Rating>
          </RankingItem>
        ))}
      </RankingList>
    </Container>
  );
}

export default PopularRestaurants;
```

```tsx
/* src/components/RestaurantCard.tsx */
import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaStar, FaHeart, FaMapMarkerAlt, FaWonSign } from 'react-icons/fa';
import { toast } from 'react-toastify';
import type { Restaurant } from '../types';
import { readStoredValue } from '../services/storage';
import { isLikedRestaurants, isRestaurantLikes } from '../services/validation';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

// Styled Components는 그대로 유지
const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
`;

const CategoryBadge = styled.span`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

// $liked로 변경 (transient prop)
const LikeButton = styled.button<{ $liked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.$liked ? '#ff4757' : '#ddd'};
  background: ${props => props.$liked ? '#ff4757' : 'white'};
  color: ${props => props.$liked ? 'white' : '#666'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #ff4757;
    background: #ff4757;
    color: white;
  }
`;

const DetailLink = styled(Link)`
  color: #667eea;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  // State 초기화
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(restaurant.likes || 0);

  // 컴포넌트 마운트 시 LocalStorage에서 데이터 복원
  useEffect(() => {
    // 1. 좋아요 여부 복원
    try {
      const likedRestaurants = readStoredValue('likedRestaurants', isLikedRestaurants, []);
      if (likedRestaurants.includes(restaurant.id)) {
        setLiked(true);
      }

      // 2. 좋아요 수 복원
      const savedLikes = readStoredValue('restaurantLikes', isRestaurantLikes, {});
      const savedCount = savedLikes[restaurant.id];
      if (savedCount !== undefined) {
        setLikes(savedCount);
      }
    } catch (error) {
      console.error('LocalStorage 읽기 오류:', error);
    }
  }, [restaurant.id, restaurant.likes]);

  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    // 이벤트 전파 방지 (중요!)
    e.preventDefault();
    e.stopPropagation();

    try {
      // 새로운 상태 계산
      const newLikedState = !liked;
      const newLikesCount = newLikedState 
        ? likes + 1 
        : Math.max(0, likes - 1); // 음수 방지

      // 두 저장값을 먼저 읽고 검증합니다.
      const previousLikedRestaurants = localStorage.getItem('likedRestaurants');
      const likedRestaurants = readStoredValue('likedRestaurants', isLikedRestaurants, []);
      const restaurantLikes = readStoredValue('restaurantLikes', isRestaurantLikes, {});
      
      if (newLikedState) {
        // 좋아요 추가
        if (!likedRestaurants.includes(restaurant.id)) {
          likedRestaurants.push(restaurant.id);
        }
      } else {
        // 좋아요 취소
        const index = likedRestaurants.indexOf(restaurant.id);
        if (index > -1) {
          likedRestaurants.splice(index, 1);
        }
      }
      
      restaurantLikes[restaurant.id] = newLikesCount;
      localStorage.setItem('likedRestaurants', JSON.stringify(likedRestaurants));
      try {
        localStorage.setItem('restaurantLikes', JSON.stringify(restaurantLikes));
      } catch (error) {
        // 두 번째 저장이 실패하면 먼저 저장한 좋아요 여부를 복원합니다.
        if (previousLikedRestaurants === null) {
          localStorage.removeItem('likedRestaurants');
        } else {
          localStorage.setItem('likedRestaurants', previousLikedRestaurants);
        }
        throw error;
      }

      // 저장이 완료된 뒤에만 화면과 성공 알림을 갱신합니다.
      setLiked(newLikedState);
      setLikes(newLikesCount);
      if (newLikedState) {
        toast.success(`${restaurant.name}을(를) 좋아요했습니다! ❤️`);
      } else {
        toast.info('좋아요를 취소했습니다.');
      }

      // 디버깅용 로그
      console.log('좋아요 업데이트:', {
        restaurantId: restaurant.id,
        liked: newLikedState,
        likes: newLikesCount
      });

    } catch (error) {
      console.error('좋아요 처리 오류:', error);
      toast.error('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <Card>
      <CardImage 
        src={restaurant.image || 'https://via.placeholder.com/300'} 
        alt={restaurant.name} 
      />
      <CardContent>
        <CardHeader>
          <CardTitle>{restaurant.name}</CardTitle>
          <CategoryBadge>{restaurant.category}</CategoryBadge>
        </CardHeader>
        
        <InfoRow>
          <FaMapMarkerAlt /> {restaurant.location}
        </InfoRow>
        <InfoRow>
          <FaWonSign /> {restaurant.priceRange}
        </InfoRow>
        <InfoRow>
          <FaStar color="gold" /> {restaurant.rating}/5.0
        </InfoRow>
        
        <p style={{ margin: '1rem 0', color: '#666' }}>
          {restaurant.description}
        </p>
        
        <ActionRow>
          <LikeButton 
            $liked={liked}  // $ prefix 추가
            onClick={handleLike}
            type="button"  // 명시적 type 지정
          >
            <FaHeart /> {likes}
          </LikeButton>
          <DetailLink to={`/restaurant/${restaurant.id}`}>
            자세히 보기 →
          </DetailLink>
        </ActionRow>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;
```

```tsx
/* src/components/RestaurantList.tsx */
import styled from '@emotion/styled';
import RestaurantCard from './RestaurantCard';
import type { Restaurant } from '../types';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 2rem;
`;

const NoResults = styled.p`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

function RestaurantList({ restaurants }: RestaurantListProps) {
  if (restaurants.length === 0) {
    return <NoResults>해당 카테고리에 맛집이 없습니다.</NoResults>;
  }

  return (
    <ListContainer>
      {restaurants.map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </ListContainer>
  );
}

export default RestaurantList;
```

```tsx
/* src/components/SubmitRestaurant.tsx */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { submissionAPI } from '../services/api';
import { FaCheckCircle } from 'react-icons/fa';
import type { CreateSubmissionInput, SubmissionFormValues } from '../types';

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem;
  
  svg {
    font-size: 4rem;
    color: #4caf50;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #4caf50;
    margin-bottom: 1rem;
  }
`;

function SubmitRestaurant() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SubmissionFormValues>();

  const onSubmit = async (data: SubmissionFormValues) => {
    try {
      const recommendedMenuArray = typeof data.recommendedMenu === 'string'
        ? data.recommendedMenu
            .split(/[\n,]/)
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

      const payload: CreateSubmissionInput = {
        restaurantName: data.restaurantName?.trim(),
        category: data.category,
        location: data.location?.trim(),
        priceRange: data.priceRange?.trim() || undefined,
        recommendedMenu: recommendedMenuArray.length ? recommendedMenuArray : undefined,
        review: data.review?.trim() || undefined,
        submitterName: data.submitterName?.trim() || undefined,
        submitterEmail: data.submitterEmail?.trim() || undefined,
      };

      await submissionAPI.createSubmission(payload);
      setSubmitted(true);
      toast.success('맛집이 성공적으로 제보되었습니다! 🎉');
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      toast.error('제출 중 오류가 발생했습니다.');
    }
  };

  if (submitted) {
    return (
      <FormContainer>
        <SuccessMessage>
          <FaCheckCircle />
          <h3>제보 감사합니다!</h3>
          <p>여러분의 제보로 캠퍼스 푸드맵이 더욱 풍성해집니다.</p>
          <button onClick={() => setSubmitted(false)}>
            다른 맛집 제보하기
          </button>
        </SuccessMessage>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>🍽️ 새로운 맛집 제보하기</FormTitle>
      <p>실습 제보는 이 브라우저에만 저장되며 다른 사용자와 공유되지 않습니다.</p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <FormGroup>
          <Label htmlFor="restaurantName">맛집 이름 *</Label>
          <Input
            id="restaurantName"
            {...register("restaurantName", {
              required: "맛집 이름은 필수입니다"
            })}
            placeholder="예: OO식당"
          />
          {errors.restaurantName && (
            <ErrorMessage>{errors.restaurantName.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">카테고리 *</Label>
          <Select
            id="category"
            {...register("category", {
              required: "카테고리를 선택해주세요"
            })}
          >
            <option value="">선택하세요</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="분식">분식</option>
            <option value="카페">카페</option>
            <option value="기타">기타</option>
          </Select>
          {errors.category && (
            <ErrorMessage>{errors.category.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="location">위치 *</Label>
          <Input
            id="location"
            {...register("location", {
              required: "위치는 필수입니다"
            })}
            placeholder="예: 아주대학교 정문 도보 5분"
          />
          {errors.location && (
            <ErrorMessage>{errors.location.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="priceRange">가격대</Label>
          <Input
            id="priceRange"
            {...register("priceRange")}
            placeholder="예: 8,000-12,000원"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="recommendedMenu">추천 메뉴</Label>
          <Textarea
            id="recommendedMenu"
            {...register("recommendedMenu")}
            placeholder="예: 치즈닭갈비, 막국수, 볶음밥"
          />
        </FormGroup>


        <FormGroup>
          <Label htmlFor="review">한줄평</Label>
          <Textarea
            id="review"
            {...register("review")}
            placeholder="이 맛집만의 특별한 점을 알려주세요"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="submitterName">제보자 이름</Label>
          <Input
            id="submitterName"
            {...register("submitterName")}
            placeholder="선택사항"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="submitterEmail">이메일</Label>
          <Input
            id="submitterEmail"
            type="email"
            {...register("submitterEmail", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "올바른 이메일 형식이 아닙니다"
              }
            })}
            placeholder="선택사항 (답변받을 이메일)"
          />
          {errors.submitterEmail && (
            <ErrorMessage>{errors.submitterEmail.message}</ErrorMessage>
          )}
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? '제출 중...' : '맛집 제보하기'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default SubmitRestaurant;
```

### 6. 페이지 (src/pages/)

완성 저장소에는 [맛집 관리 화면](src/pages/AdminPage.tsx)과 [제보 승인·거절 화면](src/pages/SubmissionsPage.tsx)도 포함되어 있습니다. 각각 `/#/admin`, `/#/submissions`에서 확인할 수 있습니다. 아래 학습용 예제는 기본 사용자 화면을 구현합니다.

```tsx
/* src/pages/DetailPage.tsx */
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { restaurantAPI } from '../services/api';
import { FaStar, FaMapMarkerAlt, FaDollarSign, FaArrowLeft } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const DetailContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const RestaurantImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const InfoSection = styled.div`
  margin: 2rem 0;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f5f5f5;
  }
`;

function DetailPage() {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => {
      if (id === undefined) throw new Error('맛집 ID가 없습니다.');
      return restaurantAPI.getRestaurantById(id);
    },
    enabled: id !== undefined,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
      </div>
    );
  }

  if (error || !data?.data) {
    return <div className="error">맛집을 찾을 수 없습니다.</div>;
  }

  const restaurant = data.data;

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> 뒤로 가기
      </BackButton>
      
      <h1>{restaurant.name}</h1>
      
      <RestaurantImage src={restaurant.image} alt={restaurant.name} />
      
      <InfoSection>
        <h3>기본 정보</h3>
        <p><FaMapMarkerAlt /> {restaurant.location}</p>
        <p><FaDollarSign /> {restaurant.priceRange}</p>
        <p><FaStar color="gold" /> {restaurant.rating}/5.0</p>
      </InfoSection>
      
      <InfoSection>
        <h3>소개</h3>
        <p>{restaurant.description}</p>
      </InfoSection>
      
      <InfoSection>
        <h3>추천 메뉴</h3>
        <MenuList>
          {restaurant.recommendedMenu.map((menu, index) => (
            <li key={index}>{menu}</li>
          ))}
        </MenuList>
      </InfoSection>
    </DetailContainer>
  );
}

export default DetailPage;
```

```tsx
/* src/pages/HomePage.tsx */
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaMapMarkedAlt, FaUtensils, FaStar } from 'react-icons/fa';

const HomeContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #667eea;
  }
  
  h3 {
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
`;

function HomePage() {
  return (
    <HomeContainer>
      <Title>우리 학교 맛집을 찾아보세요!</Title>
      <Subtitle>캠퍼스 주변 숨은 맛집들을 한눈에</Subtitle>
      
      <CardGrid>
        <Card to="/list">
          <FaMapMarkedAlt />
          <h3>맛집 둘러보기</h3>
          <p>카테고리별로 맛집을 찾아보세요</p>
        </Card>
        
        <Card to="/submit">
          <FaUtensils />
          <h3>맛집 제보하기</h3>
          <p>새로운 맛집을 알려주세요</p>
        </Card>
        <Card to="/popular">
          <FaStar />
          <h3>인기 맛집 TOP</h3>
          <p>이번 주 가장 인기있는 맛집</p>
        </Card>
        
      </CardGrid>
    </HomeContainer>
  );
}

export default HomePage;
```

```tsx
/* src/pages/ListPage.tsx */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import RestaurantList from '../components/RestaurantList';
import { restaurantAPI } from '../services/api';
import { ClipLoader } from 'react-spinners';

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const FilterContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid #667eea;
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#667eea'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

function ListPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '한식', '중식', '일식', '양식', '아시안', '분식', '카페'];

  // React Query로 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: restaurantAPI.getRestaurants,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
        <p>맛집 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">에러가 발생했습니다: {error.message}</div>;
  }

  const filteredData = selectedCategory === '전체' 
    ? data?.data 
    : data?.data.filter(r => r.category === selectedCategory);

  return (
    <PageContainer>
      <h2>맛집 목록</h2>
      
      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <RestaurantList restaurants={filteredData || []} />
    </PageContainer>
  );
}

export default ListPage;
```

```tsx
/* src/pages/PopularPage.tsx */
import { useQuery } from '@tanstack/react-query';
import PopularRestaurants from '../components/PopularRestaurants';
import { restaurantAPI } from '../services/api';
import { ClipLoader } from 'react-spinners';

function PopularPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['popular-restaurants'],
    queryFn: restaurantAPI.getPopularRestaurants,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
        <p>인기 맛집을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">에러가 발생했습니다: {error.message}</div>;
  }

  return <PopularRestaurants restaurants={data?.data || []} />;
}

export default PopularPage;
```

```tsx
/* src/pages/SubmitPage.tsx */
import SubmitRestaurant from '../components/SubmitRestaurant';

function SubmitPage() {
  return <SubmitRestaurant />;
}

export default SubmitPage;
```
---

## 📝 제보 저장 설정
### 1. 브라우저 저장 확인

이번 실습은 백엔드나 DB 없이 진행합니다. 맛집 목록은 위 가상 데이터로 표시하고, 제보는 현재 브라우저의 LocalStorage에 저장합니다. API 주소·환경변수·CORS 설정은 필요하지 않습니다.

1. 맛집 제보 폼을 작성하고 제출합니다.
2. 개발자 도구 → Application(또는 Storage) → Local Storage에서 현재 사이트를 선택합니다.
3. `pwd-week5-submissions` 키에 입력한 제보가 저장되었는지 확인합니다.
4. 페이지를 새로고침한 뒤에도 같은 키에 제보가 남아 있는지 확인합니다.
5. 다른 브라우저에서는 해당 제보가 보이지 않는지 확인합니다.

제보는 `pending` 상태로 저장되며 목록에 자동 추가되지 않습니다. README 기본 실습의 성공 기준은 저장 키 확인입니다. 완성 저장소에서는 `/#/submissions`에서 승인할 수 있습니다. 제보는 서버에 전송되지 않으므로 다른 사람의 컴퓨터에서 제출 내용을 확인할 수 없습니다.

저장한 제보는 같은 브라우저·같은 사이트 주소에서만 유지됩니다. **포트도 주소의 일부**이므로 `localhost:5173`(개발)과 `localhost:4173`(미리보기), `localhost`와 `127.0.0.1` 사이에도 데이터가 공유되지 않습니다. 로컬과 Vercel, Production과 Preview 주소의 데이터는 서로 공유되지 않습니다. 사이트 데이터를 삭제하면 제보도 지워집니다. 서버 저장과 사용자 간 공유는 이후 백엔드·DB 실습에서 다룹니다.

---

## 🌐 Vercel 배포

### 0. 배포할 코드 확정과 로컬 검증

README의 `BrowserRouter` 예제를 사용하는 경우, 상세 페이지 직접 접속·새로고침을 위해 프로젝트 루트에 `vercel.json`을 추가합니다. 실제 저장소의 `HashRouter`는 그대로 사용할 수 있습니다.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

이 설정은 화면 라우팅용입니다. 가상 데이터와 LocalStorage를 사용하므로 별도 서버 없이 배포할 수 있습니다. [Vercel Vite 배포 문서](https://vercel.com/docs/frameworks/frontend/vite)

`vercel.json`까지 저장한 뒤, 프로젝트 루트에서 실행합니다.

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

터미널의 미리보기 주소(기본 `http://localhost:4173`)에서 목록·필터·상세·인기·좋아요·제보를 확인합니다. README 예제는 `/list`, 완성 저장소는 `/#/list`로 접속합니다. 상세 URL 직접 접속과 새로고침, 제보 저장 후 새로고침도 확인합니다.

검증을 마치면 `Ctrl+C`로 미리보기 서버를 종료합니다. **수정한 전체 소스·설정·`package-lock.json`·`vercel.json`을 최종 커밋하고 push**합니다. 처음 템플릿을 만들었을 때의 커밋만 올라가 있으면 Vercel에도 템플릿 화면이 배포됩니다.

```bash
git status
git add .
git commit -m "Complete TypeScript foodmap practice"
git push origin main
```

이미 최종 코드가 반영되어 변경 사항이 없다면 추가 커밋은 생략합니다. GitHub에서 최신 커밋과 파일들이 보이는지 확인한 후 아래 Import를 진행합니다.

### 1. Vercel 계정 연결

1. [vercel.com](https://vercel.com) 로그인
2. `Add New` → `Project` 선택
3. GitHub 저장소 Import 화면으로 이동

### 2. GitHub 연결

1. GitHub 계정 연결
2. GitHub 저장소 접근 권한 승인
3. 실습 리포지토리 검색
4. 리포지토리 선택 후 `Import`

### 3. 빌드 설정

Vercel 빌드 설정은 자동으로 감지되지만, 확인 필요:

- **Framework Preset**: `Vite`
- **Root Directory**: `package.json`이 있는 프로젝트 루트
- **Production Branch**: `main` (실제 기본 브랜치에 맞게 설정)
- **Install Command**: `npm ci` (`package-lock.json`이 GitHub에 반영되어 있어야 함)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: `24.x` (Settings → Build and Deployment에서 확인; [Vercel Node 24 안내](https://vercel.com/changelog/node-js-24-lts-is-now-generally-available-for-builds-and-functions))
- **Environment Variables**: 이번 실습에서는 설정하지 않음

이번 배포는 Vercel 대시보드의 `Deploy`로 진행합니다. 완성 저장소의 기존 `npm run deploy`는 GitHub Pages용입니다. A 경로의 패키지 예제에는 이 명령이 없으며, 두 경로 모두 이번 배포는 Vercel 대시보드에서 진행합니다.

`Deploy` 클릭!

### 4. 배포 상태 확인

1. 배포 로그에서 설치 및 빌드 성공 확인
2. 성공 시 생성된 `https://<project-name>.vercel.app` 주소로 접속 (실제 할당된 도메인 사용)
3. GitHub의 Production Branch에 변경을 push한 뒤 새 배포가 생성되는지 확인

### 5. 사이트 주소 확인

1. 프로젝트의 `Settings` → `Domains`에서 실제 도메인 확인
2. 해당 주소에서 목록·상세·제보 화면이 동작하는지 확인
3. Preview 배포의 저장 데이터는 Production 주소와 별개임을 확인
4. 제출할 Production 도메인을 시크릿 창에서 열어 로그인 없이 접속 가능한지 확인. 인증 화면이 나오면 프로젝트의 Deployment Protection 설정과 제출 주소를 확인합니다. [Vercel 접근 보호 안내](https://vercel.com/docs/deployment-protection)

### 6. 제보 확인

1. 배포한 사이트에서 테스트 제보 제출
2. 제출 완료 메시지 확인
3. 개발자 도구의 Local Storage에서 `pwd-week5-submissions` 확인 후 새로고침해도 남아 있는지 확인

---

## 🐛 트러블슈팅

### 문제 1: Vercel 배포 실패

```text
빌드 결과 디렉터리 dist를 찾을 수 없음

# 해결방법
1. Vercel 프로젝트의 빌드 설정 확인
2. Root Directory가 package.json이 있는 폴더인지 확인
3. Build Command를 'npm run build', Output Directory를 'dist'로 설정
4. 빌드 로그의 오류 수정 후 재배포
```

### 문제 2: TypeScript·ESLint 설정 오류

- `Missing script: typecheck`: `package.json`을 예제 전체 내용으로 교체했는지 확인합니다.
- `Cannot find module` 또는 타입 패키지 오류: `package.json` 교체 후 `npm install`을 다시 실행하고, 파일명 대소문자와 `.ts`·`.tsx` 경로를 확인합니다.
- 린트 설정이 반영되지 않음: 루트에 `eslint.config.js`가 남아 있으면 삭제하고 `eslint.config.ts`만 둡니다.
- 설치 로그의 `npm audit` 경고는 빌드 실패와 구분합니다. 새 실습용 예제는 Vercel에 불필요한 `gh-pages`를 제외했습니다. 기존 lockfile의 경고와 검증 범위는 아래 검토 기록을 참고하고, 메이저 버전을 바꾸는 `npm audit fix --force`를 실습 중 일괄 실행하지 않습니다.

### 문제 3: 제보가 작동하지 않음

1. 필수 입력값과 이메일 형식 확인
2. 브라우저의 사이트 데이터 저장이 허용되어 있는지 확인
3. Local Storage의 `pwd-week5-submissions` 값이 JSON 배열이고 각 항목의 `restaurantName`, `category`, `location`, `id`, `status` 형식이 맞는지 확인
4. 데이터를 확인하는 사이트 주소가 제보한 주소와 같은지 확인

## 🔎 실습 재현 검토 기록

2026년 10월 12일에 README 예제를 새 프로젝트로 구성한 A 경로와 완성 저장소의 B 경로를 각각 독립 설치했습니다. 두 경로 모두 타입 검사·린트·빌드와 브라우저 검증 **총 40개 항목**을 통과했습니다. A 경로의 신규 설치는 `npm audit` 0건이며, B 경로의 기존 lockfile에는 경고 23건이 남아 있습니다. 실제 Vercel 계정 배포는 별도 확인 대상입니다. [검토 결과와 재현 근거](reports/readme-review-2026-10-12.md)

## 💬 도움 & 질문
- [Practical Web Service TA](https://chatgpt.com/g/g-68bbbf3aa57081919811dd57100b1e46-ajou-digtalmedia-practical-web-service-ta)
---


---
## 📚 추가 학습 자료

### 공식 문서
- [React 공식 문서](https://react.dev)
- [React Router 문서](https://reactrouter.com)
- [Vercel 문서](https://vercel.com/docs/frameworks/frontend/vite)

### 추천 강의
- [생활코딩 React](https://opentutorials.org/course/4900)


## 📝 제출 방법
### 마감일
- 2026년 10월 18일 23:59까지 (한국시간)
### GitHub URL 
(예: https://github.com/<username>/pwd-week5)
### Vercel App URL
(예: https://<project-name>.vercel.app)
### 실습 체크리스트
- GitHub의 최신 커밋에 최종 소스·설정·`package-lock.json`·`vercel.json`이 모두 포함되어 있는가?
- `npm run typecheck`, `npm run lint`, `npm run build`가 모두 통과하는가?
- 목록·필터·상세·인기·좋아요·제보가 동작하고, 상세 URL 새로고침과 모바일 화면도 확인했는가?
- Vercel에 GitHub 저장소가 연결되어 최신 커밋이 배포되었고, 제출할 Production URL을 시크릿 창에서도 열 수 있는가?
- 맛집 정보 제출 시 현재 브라우저의 LocalStorage에 데이터가 잘 저장되었는가?


## 🎉 축하합니다!

이제 여러분은:
- ✨ React로 실제 작동하는 웹 서비스를 만들었습니다
- ✨ 주요 React 라이브러리를 사용할 수 있습니다
- ✨ Git과 GitHub를 활용할 수 있습니다
- ✨ Vercel로 웹사이트를 배포할 수 있습니다

**다음 주**: Node.js와 Express로 백엔드 API 만들기

---

*Last Updated: 2026.10.12*\
*Created by: Hyunseok Oh - Ajou Digital Media Practical Web Service*

</details>
