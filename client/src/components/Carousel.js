import Slider from 'react-animated-slider';
import horizontalCss from 'react-animated-slider/build/horizontal.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import carouselCss from './Carousel.css';

const useStyles = makeStyles((theme) => ({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        //height: '100vh',
        display: 'flex',
        textAlign: 'center',
        //flexDirection: 'column',
        //position: 'absolute',
        //top: '50%',
        //left: '50%',
        //transform: 'translate(-50 %, -50 %)'
    },
    inner: {
        padding: '0 70px',
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    slider: {
        position: 'relative',
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        '& a': {
            '&.previousButton, &.nextButton': {
                fontSize: '22px',
                lineHeight: 0,
                display: 'block',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                transition: 'all .3s linear',
                zIndex: 1,
                padding: '10px',
                textDecoration: 'none',
                backfaceVisibility: 'hidden',
                '& svg': {
                    '& polygon': {
                        fill: '#ffd800',
                    }
                },
                '&:not(.disabled):hover': {
                    transform: 'translateY(-50 %) scale(1.25)',
                    cursor: 'pointer',
                }
            },
            '&.previousButton': {
                left: '20px',
            },
            '&.nextButton': {
                right: '20px',
            }

        }
    },
    sliderContent: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        overflow: 'hidden',
        textAlign: 'center',
        backgroundSize: 'cover !important',
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))',
            bottom: 0,
            left: 0,
        },
        '&.hidden': {
            visibility: 'hidden',
        },
        '&.previous': {
            left: '-100%',
        },
        '&.current': {
            left: 0,
        },
        '&.next': {
            left: '100%',
        },
        '&.animateIn, &.animateOut': {
            webkitTransition: 'all 2s ease',
            transition: 'all 2s ease',
            '&.previous, &.next': {
                left: 0,
                visibility: 'visible',
                '& .MuiTypography-subtitle1': {
                    transitionDelay: '1.1s',
                },
                '& .MuiButton': {
                    transitionDelay: '1.3s',
                }


            },
            '&.previous': {
                left: '100%',
            },
            '&.next': {
                left: '-100%',
            },
            '& .MuiTypography-subtitle1': {
                transitionDelay: '.3s',
            },
            '& .MuiButton': {
                transitionDelay: '.2s',
            }
        },

    }
}
));

const content = [
    {
        image: 'assets/3.jpg',
        title: 'Course 1',
        description: 'Course about a bout bla bal bal.',
        button: 'Join now'
    },
    {
        image: 'assets/2.jpg',
        title: 'Course 2',
        description: 'Course about a bout bla bal bal.',
        button: 'Explore'
    },
    {
        image: 'assets/2.jpg',
        title: 'Course 3',
        description: 'Course about a bout bla bal bal.',
        button: 'Join now'
    }

];

function Carousel() {
    const classes = useStyles();
    return (
        <Slider classNames={carouselCss} autoplay={2000}>
            {content.map((item, index) => (
                <div
                    key={index}
                    style={{ background: `url('${item.image}') no-repeat center center` }}
                    className={carouselCss.slide}
                >
                    <div className={classes.inner}>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <button>{item.button}</button>
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default Carousel;
