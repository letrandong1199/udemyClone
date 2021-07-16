import { red } from '@material-ui/core/colors';
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

export const lightTheme = unstable_createMuiStrictModeTheme({
    palette: {
        primary: {
            //light: '#6f63ff',
            main: '#0056d2', //'#0336ff',
            dark: '#0008ca',
            contrastText: 'white',
        },
        secondary: {
            //light: '#ffff51',
            main: '#ffcd03',
            dark: '#c79d00',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
            vibrant: 'rgba(243,243,255,1)'
        },
        text: {
            primary: 'hsl(240, 15%, 35%)',
        },
        type: 'light',
    },
});

export const darkTheme = unstable_createMuiStrictModeTheme({
    palette: {
        primary: {
            //light: '#6f63ff',
            main: '#0056d2', //'#0336ff',
            dark: '#0008ca',
            contrastText: 'white',
        },
        secondary: {
            //light: '#ffff51',
            main: '#ffcd03',
            dark: '#c79d00',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#1f1f1f',
            vibrant: 'hsl(240, 15%, 35%)',
        },

        type: 'dark',
    },
});

export default lightTheme