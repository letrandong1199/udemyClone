import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React from 'react'
import { useStyles } from './styles';
import { ROUTES } from '../../config/config';
import { useHistory } from 'react-router-dom';

function CategoryCard({ category }) {
    const classes = useStyles();
    const history = useHistory();

    const handleClick = () => {
        history.push(`${ROUTES.course}/${category?.id}`)
    }

    return (
        <Card className={classes.root} elevation={3} onClick={handleClick}>
            <CardMedia
                className={classes.media}
                image={category?.Thumbnail_Small}
                title={category?.Name}
                children={<Typography
                    className={classes.price}
                >
                    {category?.Name}
                </Typography>
                }
            />
        </Card >
    )
};

export default CategoryCard;