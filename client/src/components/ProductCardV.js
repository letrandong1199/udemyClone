import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '10px',
        maxWidth: 345,
        //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
        boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        position: 'relative'
    },
    price: {
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: "rgba(255, 255, 255, 0.5)"
    },
}));


function ProductCardV() {
    const classes = useStyles();
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    return (
        <Card className={classes.root} >
            <CardHeader
                title="Course 1"
                subheader="Author Name"
            />
            <CardMedia
                className={classes.media}
                image="assets/3.jpg"
                title="3"
                children={<Typography className={classes.price}>19$</Typography>}
            />
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Here is a short description for this course. Blab blab balb blab.
                </Typography>
            </CardContent>

        </Card >
    )
}
export default ProductCardV