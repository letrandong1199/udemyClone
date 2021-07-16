import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React from 'react'
import { useStyles } from './styles';

function CategoryCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={3}>
            <CardMedia
                className={classes.media}
                image={props.catg.thumbnail_small}
                title={props.catg.name}
                children={<Typography className={classes.price}>{props.catg.name}</Typography>}
            />


        </Card >
    )
};

export default CategoryCard;