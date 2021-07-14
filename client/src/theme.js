import { red } from '@material-ui/core/colors';
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme({
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
        },
    },
});

export default theme;