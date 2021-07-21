import ProductCardV from '../ProductCardV/ProductCardV.jsx';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Fragment } from 'react'
import { useStyles } from './styles';
import CategoryCard from '../CategoryCard/CategoryCard.jsx'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';


function MyCarousel(props) {
    const classes = useStyles(props);
    let list_ = undefined;
    const courses = props.courses;

    list_ = courses.map((course, index) => {
        return <Grid item key={index} style={{ scrollSnapAlign: 'start', }}>
            <ProductCardV course={course} />

        </Grid>
    })

    const containerRef = React.useRef(null);
    const [state, setState] = React.useState({
        scroller: null,
        itemWidth: 0,
        isPrevHidden: true,
        isNextHidden: false

    })

    const handleNext = () => {
        state.scroller.scrollBy({ left: state.itemWidth, top: 0, behavior: 'smooth' });

        // Hide if is the last item
        setState({ ...state, isNextHidden: true, isPrevHidden: false });
    }


    const handlePrev = () => {
        state.scroller.scrollBy({ left: -state.itemWidth, top: 0, behavior: 'smooth' });
        setState({ ...state, isNextHidden: false, isPrevHidden: true });
        // Hide if is the last item
        // Show remaining
    }

    React.useEffect(() => {

        //const items = containerRef.current.childNodes;
        const scroller = containerRef.current;
        const itemWidth = containerRef.current.clientWidth;
        setState({ ...state, scroller, itemWidth });

    }, [courses])

    return (
        <Fragment>
            <Grid container
                className={classes.root}
            >
                <IconButton onClick={handlePrev} className={classes.previousButton}>
                    <ArrowBackIosRoundedIcon />
                </IconButton>
                <IconButton variant='contained' onClick={handleNext} className={classes.nextButton}>
                    <ArrowForwardIosRoundedIcon />
                </IconButton>
                <div className={classes.list} ref={containerRef}>
                    {list_}
                </div>

            </Grid>
        </Fragment >
    )
}

export default MyCarousel