import { ReactComponent as Image404 } from "../../404.svg";
import { useStyles } from './styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default function Page404() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Image404 width={"40%"} />
            <Button><Link to='/'>Go home</Link></Button>
        </Grid>
    )
};
