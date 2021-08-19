import { red } from '@material-ui/core/colors';
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const commonTheme = {
    shape: {
        borderRadius: 6,
    }
}

export const lightTheme = unstable_createMuiStrictModeTheme({
    palette: {
        primary: {
            //light: '#6f63ff',
            main: '#0056d2', //'#0336ff',
            dark: '#0008ca',
            contrastText: '#FFF',
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
            default: 'rgb(255, 255, 255)',
            vibrant: 'rgba(243,243,255,1)',
            acrylic: 'rgba(195,195,195,0.7)',
            fade: 'rgba(255, 255, 255, 0)',
        },
        text: {
            primary: 'hsl(240, 15%, 35%)',
        },
        type: 'light',
    },
}, commonTheme);

export const darkTheme = unstable_createMuiStrictModeTheme({
    palette: {
        primary: {
            light: '#205d9b', //'#6f63ff',
            main: '#2E86DE', //'#0056d2', //'#0336ff',
            dark: '#579ee4', //'#0008ca',
            contrastText: '#FFF',
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
            acrylic: 'rgba(127, 127, 127, 0.7)',
            fade: '#1f1f1f00',
        },
        text: {
            primary: 'rgb(234,234,238)',
        },

        type: 'dark',
    },
}, commonTheme);

export default lightTheme