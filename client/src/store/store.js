import { configureStore } from '@reduxjs/toolkit';
import toggleThemeReducer from './features/theme/themeSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';

export const store = configureStore({
    reducer: {
        toggleTheme: toggleThemeReducer,
        wishlist: wishlistReducer,
    },
});