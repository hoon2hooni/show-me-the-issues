# Show me the issues

[github rest api](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#about-search)를 활용해 원하는 public repository의 issue들을 모아서 확인할 수 있는 프로젝트 입니다.

사용한 api는 다음과 같습니다

```bash
# 레포지토리 이름 검색,
https://api.github.com/search/repositories?q=Q
# 레포지토리의 이슈 검색,
https://api.github.com/search/issues?q=Q
```

## 1. 실행 방법

### 프로젝트 설치방법

```bash
npm run install
```

### 프로젝트 빌드방법

```bash
npm run build
```

### 프로젝트 시작방법

```bash
npm run start
```

### 프로젝트 테스팅 방법

```bash
npm run e2e
#웹을 실행하고 cypress를 엽니다.
npm run e2e:headless 
#웹을 실행하고 cypress를 headless모드로 실행합니다.
npm run test
#unit test를 진행합니다.
```

## 2. 사용한 기술

### 1. 프레임워크

- nextjs

### 2. 사용 언어

- typescript

### 3. 라이브러리

- react-query
- axios

### 4. 디자인

- chakra-ui

### 5. 테스팅

- jest
  - 단위 테스트
- cypress
  - e2e 테스트

## 3.사용한 기술의 이유

### 1. nextjs

nextjs는 react를 활용하여 SSR(서버사이드 렌더링)을 가능하게 해주는 프레임워크입니다.
<br/>
<strong>nextjs를 사용한 이유는 다음과 같습니다.</strong>
- nextjs는 SSR을 지원합니다. 
이는 자바스크립트가 없는 환경에서도 최소한의 빌드 된 화면을 유저들에게 보여줍니다.

<img width="500" alt="image" src="https://user-images.githubusercontent.com/70311004/211442490-3df53895-9e37-48e4-9dfd-9fb21febb538.png"/>

위 이미지는 실제 chrome 개발자 도구를 활용하여
<br/>
자바스크립트를 제한하고 실행한 화면입니다.
<br/>
js가 없음에도 불구하고 nextjs의 SSR의 지원으로 인해 서버에서 빌드 된 show me the issues의 페이지가 보여집니다.
<br/>
**만약 SSR 지원이 없었더라면 빈 화면이 보였을 것입니다.**

### 2. typescript

typescript는 javascript에 정적 타입 언어를
지원해 줍니다.
<br/>
<strong>typescript를 사용한 이유는 다음과 같습니다.</strong>

- 안정적인 앱과 더불어 빠르게 개발을 할 수 있게 도와줍니다.
미리 함수의 interface, api의 응답 type을 정한 후에 개발하기에 editor의 자동완성의 도움과 발생할 수 있는 에러를 컴파일 단계에서 잡아줍니다.


### 3. react-query

react-query는 server state를 지원해 주는 라이브러리입니다.

<strong>react-query를 사용한 이유는 다음과 같습니다.</strong>

  1. 데이터를 캐싱 합니다. 이로 인해 같은 요청일 경우 데이터를 유저에게 빠르게 보여줍니다.

  2.  선언형으로 프로그래밍을 가능하게 합니다.
  이는 데이터를 불러오는 부분의 코드를 간결해졌습니다.

### 4. chakra-ui

디자인 컴포넌트로는 chakra-ui를 사용했습니다.
<br/>
<strong>charka-ui를 사용한 이유는 다음과 같습니다.</strong>
- 프로젝트에 알맞은 컴포넌트(table, badge, toast..)가 제공되었습니다.
- 다른 디자인 시스템에 비해 확장성이 좋습니다.

### 5. cypress

cypress는 e2e테스팅 툴입니다.
<br/>
<strong>cypress를 사용한이유는 다음과 같습니다.</strong>

- cypress를 활용해 테스트를 구축해 놓으니 유지보수가 편리해졌습니다.
  이는 이번 프로젝트에서 refactoring을 하는데 있어서 도움이 되었습니다.

## 4. 폴더 구조

```bash
├── README.md
├── components
│   ├── common
│   │   ├── FixedHeightCenterWrapper.tsx
│   │   ├── Layout.tsx
│   │   ├── Pagination.tsx
│   │   └── index.tsx
│   ├── issues
│   │   ├── IssuesTable.tsx
│   │   ├── IssuesTableTemplate.tsx
│   │   └── index.tsx
│   └── repositories
│       ├── RepositoriesCards.tsx
│       ├── RepositoriesSearchBar.tsx
│       └── index.tsx
├── cypress
│   ├── e2e
│   │   ├── searchIssues.cy.ts
│   │   └── searchRepository.cy.ts
│   ├── fixtures
│   │   ├── searchIssuesResponses
│   │   └── searchRepositoriesResponses
│   ├── support
│   │   ├── commands.ts
│   │   ├── e2e.ts
│   │   └── index.d.ts
│   └── tsconfig.json
├── cypress.config.js
├── jest.config.js
├── lib
│   ├── api
│   │   ├── getIssues.ts
│   │   ├── getRepositories.ts
│   │   ├── getSearch.ts
│   │   ├── githubSearchAxiosInstance.ts
│   │   └── index.ts
│   ├── helper
│   │   ├── getApiResetTime.ts
│   │   ├── getQueryString.ts
│   │   ├── getRepositoryInfoFromURL.ts
│   │   ├── index.ts
│   │   └── issueQueryBuilder.ts
│   └── hooks
│       ├── index.ts
│       ├── useDebounce.ts
│       ├── useIssues.ts
│       ├── useRepositories.ts
│       └── useSearch.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│   ├── _app.tsx
│   └── index.tsx
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── tests
│   ├── getRepositoryInfoFromURL.test.ts
│   ├── queryBuilder.test.ts
│   └── queryString.test.ts
├── tsconfig.json
└── types
    ├── common.ts
    ├── issue.ts
    └── repository.ts

```
