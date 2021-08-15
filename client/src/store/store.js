import { configureStore } from '@reduxjs/toolkit';
import toggleThemeReducer from '../features/theme/themeSlice';

export const store = configureStore({
    reducer: {
        toggleTheme: toggleThemeReducer,
    },
});