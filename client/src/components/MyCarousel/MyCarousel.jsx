import ProductCardV from '../ProductCardV/ProductCardV.jsx';
import Grid from '@material-ui/core/Grid';
import { Fragment, useState, useEffect, useRef } from 'react'
import { useStyles } from './styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';


function MyCarousel(props) {
    const classes = useStyles(props);
    const [listCourses, setListCourses] = useState(null);


    useEffect(() => {
        if (props.courses) {
            console.log('Chan');
            setListCourses(props.courses.map((course, index) => {
                return <Grid item key={index} style={{ scrollSnapAlign: 'start', }}>
                    <ProductCardV course={course} />
                </Grid>
            }))
        }
    }, [props.courses])

    const containerRef = useRef(null);
    const [state, setState] = useState({
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

    useEffect(() => {
        console.log('Qua');
        //const items = containerRef.current.childNodes;
        const scroller = containerRef.current;
        const itemWidth = containerRef.current.clientWidth;
        setState({ ...state, scroller, itemWidth });

    }, [listCourses])

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
                    {listCourses}
                </div>
            </Grid>
        </Fragment >
    )
}

export default MyCarousel