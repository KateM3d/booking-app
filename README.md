# React + TypeScript + Vite

![Screenshot 2024-01-27 at 2 41 57 PM (2)](https://github.com/KateM3d/booking-app/assets/78667247/e2d85c64-93cb-466b-bf31-b1987acac106)
![Screenshot 2024-01-27 at 2 42 47 PM (2)](https://github.com/KateM3d/booking-app/assets/78667247/1cf30006-e0ca-4dc1-a933-245b3c0fdf29)
![Screenshot 2024-01-27 at 2 36 14 PM (2)](https://github.com/KateM3d/booking-app/assets/78667247/10184df2-54b9-485e-9cb1-1f8b5d84a689)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
