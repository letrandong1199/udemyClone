import Slider from 'react-animated-slider';
import horizontalCss from 'react-animated-slider/build/horizontal.css';
import { makeStyles } from '@material-ui/core/styles';

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
    }
}));

const content = [
    {
        image: 'assets/3.jpg',
        title: 'Course 1',
        description: 'Course about a bout bla bal bal.',
        button: 'Join now'
    }
];

function Carousel() {
    const classes = useStyles();
    return (
        <Slider classNames={horizontalCss}>
            {content.map((item, index) => (
                <div
                    key={index}
                    style={{ background: `url('${item.image}') no-repeat center center` }}
                    className={classes.center}
                >
                    <div className="dd">
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
