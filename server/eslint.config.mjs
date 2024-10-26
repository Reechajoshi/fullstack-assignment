
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';


export default tseslint.config(
    {
        ignores: ["dist/**/*.{js,js.map}"]
    },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);

