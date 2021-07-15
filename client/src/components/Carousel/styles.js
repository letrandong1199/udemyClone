import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    slider: {
        position: "relative",
        width: "100%",
        height: "400px",
        //marginTop: 20,
        overflow: "hidden",
        "& a.previousButton:not(.disabled):hover, & a.nextButton:not(.disabled):hover": {
            transform: "translateY(-50%) scale(1.25)",
            cursor: "pointer"
        },
        "& a.previousButton svg polygon, & a.nextButton svg polygon": {
            fill: "#ffd800",
            display: 'none',
        },
        "&:hover": {
            "& a.previousButton svg polygon, & a.nextButton svg polygon": {
                display: 'block',
                fill: theme.palette.primary.light,
            },
        },
        "& a.previousButton, & a.nextButton": {
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
        "& a.previousButton": { left: "20px" },
        "& a.nextButton": { right: "20px" },
    },

    slide: {
        width: "100%",
        height: "100%",
        position: "absolute",
        overflow: "hidden",
        textAlign: "center",
        backgroundSize: "cover !important",
        "&::before": {
            content: "''",
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%",
            background: theme.palette.background.vibrant,// "linear-gradient(transparent, rgba(0, 0, 0, 0.9))",
            bottom: "0",
            left: "0"
        },
        "&.hidden": { visibility: "hidden" },
        "&.previous": { left: "-100%" },
        "&.current": { left: "0" },
        "&.next": { left: "100%" },
        "&.animateIn, &.animateOut": {
            WebkitTransition: "all 2s ease",
            transition: "all 2s ease"
        },
        "&.animateIn.previous, &.animateIn.next": {
            left: "0",
            visibility: "visible"
        },
        "&.animateIn.previous p, &.animateIn.next p": {
            transitionDelay: "1.1s"
        },
        "&.animateIn.previous button, &.animateIn.next button": {
            transitionDelay: "1.3s"
        },
        "&.animateOut.previous": { left: "100%" },
        "&.animateOut.next": { left: "-100%" },
        "&.animateOut h1": { transitionDelay: ".3s" },
        "&.animateOut p": { transitionDelay: ".2s" },
        "&.current h1, &.current button, &.current p, &.animateIn h1, &.animateIn button, &.animateIn p": {
            transform: "translateX(0)",
            transitionDelay: ".9s",
            opacity: 1,
        },
        "& h3": {
            //fontWeight: 700,
            //margin: "0 auto",
            //maxWidth: "840px",
            color: theme.palette.text.primary, //"#FFFFFF",
            //fontSize: "54px",
            //lineHeight: 1,
            transition: "all .3s ease",
            //transform: "translateY(-20px)",
            //opacity: 0,
        },
        "& p": {
            color: theme.palette.text.primary, //"#FFFFFF",
            fontSize: "14px",
            lineHeight: 1.5,
            margin: "20px 0 30px",//"20px auto 30px",
            maxWidth: "640px",
            transition: "all .3s ease",
            transform: "translateY(20px)",
            opacity: 0,
        },
        "& button": {
            transition: "all .3s ease",
            transform: "translateY(20px)",
            textTransform: 'none',
            opacity: 0,
        },
    },
    '.MuiTypography-h3': {
        transition: "all .3s ease",
    },
    card: {
        //flexGrow: 1,
        padding: 20,
        //padding: '0 70px',
        //boxSizing: 'border-box',
        direction: 'column',
        position: 'relative',
        //width: '50%',
        width: "auto",
        height: "100%",
        //top: '50%',
        //transform: 'translateY(-50%)',
        left: '0%',
        //margin: 50,
        alightItem: "center",
        justifyContent: 'center',
        justifySelf: 'center',

        //left: '50%',
        //WebkitTransform: "translate(-50%, -50%)",
        //transform: 'translate(-50%, -50%)',

    },
    cardImage: {
        position: 'relative',
        padding: 20,
    },

    limitLine: {
        overflow: 'hidden',
        WebkitLineClamp: 4,
        textOverflow: 'ellipsis',
        wordWrap: 'break-word',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical'
    },
    inner: {
        height: "100%",
        padding: '0 70px',
        //boxSizing: 'border-box',
        //direction: 'column',
        position: 'relative',
        //width: '50%',
        //top: '50%',
        //transform: 'translateY(-50%)',
        left: '0%',
        alignItems: 'flex-start',
        justifySelf: 'center',
        justifyContent: 'center'
        //left: '50%',
        //WebkitTransform: "translate(-50%, -50%)",
        //transform: 'translate(-50%, -50%)',
    },
}))