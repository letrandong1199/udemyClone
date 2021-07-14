import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    ".slider": {
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden"
    },
    ".slider a.previousButton:not(.disabled):hover, .slider a.nextButton:not(.disabled):hover": {
        transform: "translateY(-50%) scale(1.25)",
        cursor: "pointer"
    },
    ".slider a.previousButton svg polygon, .slider a.nextButton svg polygon": {
        fill: "#ffd800"
    },
    ".slider a.previousButton, .slider a.nextButton": {
        fontSize: "22px",
        lineHeight: 0,
        display: "block",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        transition: "all .3s linear",
        zIndex: 1,
        padding: "10px",
        textDecoration: "none",
        backfaceVisibility: "hidden"
    },
    ".slider a.previousButton": { left: "20px" },
    ".slider a.nextButton": { right: "20px" },
    ".slide": {
        width: "100%",
        height: "100%",
        position: "absolute",
        overflow: "hidden",
        textAlign: "center",
        backgroundSize: "cover !important"
    },
    ".slide::before": {
        content: "''",
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "linear-gradient(transparent, rgba(0, 0, 0, 0.9))",
        bottom: "0",
        left: "0"
    },
    ".slide.hidden": { visibility: "hidden" },
    ".slide.previous": { left: "-100%" },
    ".slide.current": { left: "0" },
    ".slide.next": { left: "100%" },
    ".slide.animateIn,\n\t.slide.animateOut": {
        WebkitTransition: "all 2s ease",
        transition: "all 2s ease"
    },
    ".slide.animateIn.previous, .slide.animateIn.next": {
        left: "0",
        visibility: "visible"
    },
    ".slide.animateIn.previous p, .slide.animateIn.next p": {
        transitionDelay: "1.1s"
    },
    ".slide.animateIn.previous button, .slide.animateIn.next button": {
        transitionDelay: "1.3s"
    },
    ".slide.animateOut.previous": { left: "100%" },
    ".slide.animateOut.next": { left: "-100%" },
    ".slide.animateOut h1": { transitionDelay: ".3s" },
    ".slide.animateOut p": { transitionDelay: ".2s" },
    ".slide.current h1, .slide.current button, .slide.current p, \n    .slide.animateIn h1, .slide.animateIn button, .slide.animateIn p": {
        transform: "translateX(0)",
        transitionDelay: ".9s",
        opacity: 1
    },
    inner: {
        padding: '0 70px',
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        top: '50%',
        left: '50%',
        WebkitTransform: "translate(-50%, -50%)",
        transform: 'translate(-50%, -50%)',

        "&.MuiTypography-subtitle1": {
            color: "#FFFFFF",
            fontSize: "14px",
            lineHeight: 1.5,
            margin: "20px auto 30px",
            maxWidth: "640px",
            transition: "all .3s ease",
            transform: "translateY(20px)",
            opacity: 0
        }
    },

    ".slide h1": {
        fontWeight: 900,
        margin: "0 auto",
        maxWidth: "840px",
        color: "#FFFFFF",
        fontSize: "64px",
        lineHeight: 1,
        transition: "all .3s ease",
        transform: "translateY(-20px)",
        opacity: 0
    },
    ".slide p": {
        color: "#FFFFFF",
        fontSize: "14px",
        lineHeight: 1.5,
        margin: "20px auto 30px",
        maxWidth: "640px",
        transition: "all .3s ease",
        transform: "translateY(20px)",
        opacity: 0
    },
    ".slide button": {
        transition: "all .3s ease",
        transform: "translateY(20px)",
        opacity: 0
    }
}))