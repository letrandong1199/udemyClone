import { ReactComponent as Image404 } from '../../svgs/404.svg';
import { useStyles } from './styles';
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/config';

export default function Page404() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Image404 width={'40%'} />
            <Button
                component={Link}
                to={ROUTES.home}
            >
                Go home
            </Button>
        </Grid>
    )
};
