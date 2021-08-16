import { useReducer } from "react";
import { Container, Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import HomeSection from '../../components/HomeSection';
import { useSelector, useDispatch, } from 'react-redux';
import wishlistService from "../../services/wishlist.service.js";
import { removeWishlist, } from '../../store/features/wishlist/wishlistSlice';
import useStyles from './styles';

const snackbarReducer = (state, action) => {
    switch (action.type) {
        case "SNACK_INIT":
            return {
                ...state,
                isLoading: true,
                open: false,
            };
        case "SNACK_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                snackContent: 'Success',
                snackType: 'success',
                open: true,
            };
        case "SNACK_ERROR":
            return {
                ...state,
                isLoading: false,
                snackContent: action.payload,
                snackType: 'error',
                open: true,
            };
        case 'CLOSE_SNACK':
            return {
                ...state,
                snackContent: '',
                snackType: '',
                open: false,
            };
        default:
            throw new Error('Action is invalid');
    }
}

const Wishlist = () => {
    const classes = useStyles();
    const [snackState, dispatchSnackState] = useReducer(snackbarReducer, {
        isLoading: false,
        open: false,
    })

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return event;
        }
        dispatchSnackState({ type: 'CLOSE_SNACK' })
    };
    const wishlist = useSelector((state) => state.wishlist)
    const reduxDispatch = useDispatch();

    const handleRemove = (id) => () => {
        dispatchSnackState({ type: 'SNACK_INIT' })
        wishlistService.deleteOne(id).then(response => {
            dispatchSnackState({ type: 'SNACK_SUCCESS' });
            reduxDispatch(removeWishlist(id));
            return response;
        }).catch(error => {
            dispatchSnackState({ type: 'SNACK_ERROR', payload: error.message })
            console.log(error);
        })
    };

    return (
        <Container style={{ padding: 0, flexGrow: 1 }}>
            <HomeSection
                title="Learning"
                color="vibrant"
                courses={wishlist}
                disableTitle
                isWishlist
                handleRemove={handleRemove}
            />
            <Backdrop className={classes.backdrop} open={snackState.isLoading}>
                <CircularProgress color='primary' />
            </Backdrop>
            <Snackbar
                open={snackState.open}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnack} severity={snackState.snackType}>
                    {snackState.snackContent}
                </Alert>
            </Snackbar>
        </Container>
    )
};

export default Wishlist;