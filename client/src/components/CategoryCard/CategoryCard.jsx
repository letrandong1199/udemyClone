import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import Hidden from '@material-ui/core/Hidden';

function CategoryCard(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(3);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root} elevation={3}>
            <CardMedia
                className={classes.media}
                image={props.catg.thumb}
                title={props.catg.title}
                children={<Typography className={classes.price}>{props.catg.title}</Typography>}
            />


        </Card >
    )
};

export default CategoryCard;