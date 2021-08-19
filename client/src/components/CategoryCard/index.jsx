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
        history.push(`${ROUTES.course}?category=${category?.Id}`)
    }

    const dicImage = {
        1: '',
        2: '',
        3: '/assets/thumbnail/small/web-development.jpg',
        4: '/assets/thumbnail/small/mobile-development.jpg',
        5: '/assets/thumbnail/small/data-science.jpg',
        6: '/assets/thumbnail/small/web-design.jpg',
        7: '/assets/thumbnail/small/graphic-design.jpg',
        8: '/assets/thumbnail/small/design-thinking.jpg',
    }

    return (
        <Card className={classes.root} elevation={3} onClick={handleClick}>
            <CardMedia
                className={classes.media}
                image={category?.Thumbnail_Small || dicImage[category?.Id]}
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