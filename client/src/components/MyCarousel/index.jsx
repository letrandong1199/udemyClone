import ProductCardV from '../ProductCardV';
import {
    Fragment,
    useState,
    useEffect,
    useRef
} from 'react'
import { useStyles } from './styles';
import { IconButton, Grid } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { Skeleton } from '@material-ui/lab';

function MyCarousel({ courses, loading }) {
    const classes = useStyles();

    const containerRef = useRef(null);
    const [status, setStatus] = useState({
        scroller: null,
        itemWidth: 0,
        isPrevHidden: true,
        isNextHidden: false

    })

    const handleNext = () => {
        status.scroller.scrollBy({ left: status.itemWidth, top: 0, behavior: 'smooth' });

        // Hide if is the last item
        setStatus({ ...status, isNextHidden: true, isPrevHidden: false });
    }


    const handlePrev = () => {
        status.scroller.scrollBy({ left: -status.itemWidth, top: 0, behavior: 'smooth' });
        setStatus({ ...status, isNextHidden: false, isPrevHidden: true });
        // Hide if is the last item
        // Show remaining
    }



    useEffect(() => {
        const scroller = containerRef.current;
        const itemWidth = containerRef.current.clientWidth;
        setStatus({ ...status, scroller, itemWidth });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

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
                    {loading
                        ? <Skeleton><ProductCardV /></Skeleton>
                        : courses.map((course, index) => {
                            return <Grid item key={index} style={{ scrollSnapAlign: 'start', }}>
                                <ProductCardV course={course} />
                            </Grid>
                        })
                    }
                </div>
            </Grid>
        </Fragment >
    )
}

export default MyCarousel