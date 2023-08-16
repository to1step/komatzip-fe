# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## to1step npm 이용 방법

#### Personal access tokens (classic) 토큰 발급

1. Github 로그인
2. `Settings` -> `Developer Settings` 접속하여 `Personal access tokens (classic)` 클릭
3. Generate new token (classic) 을 클릭하여 토큰 생성 페이지 이동
4. read:packages 옵션 활성화

#### 로그인 하기

프로젝트 레포로 이동하여 아래 명령어 실행

```
npm login --registry=https://npm.pkg.github.com
username: 본인 깃허브 이름
password: 발급받은 token
email: 본인 이메일
```

- `npm 9v`을 사용하는 경우 npm login --registry=https://npm.pkg.github.com 뒤에 `--auth-type=legacy` 부분을 추가해야함
