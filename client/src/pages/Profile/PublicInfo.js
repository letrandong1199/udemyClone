import {
    useState,
    useEffect,
    Fragment,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
    Grid,
    Container,
    Typography,
    Avatar,
    Button,
    CircularProgress,
    Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import clsx from 'clsx';
import useForm from '../../utils/useForm';

import useStyles from './styles';
import publicInfoService from '../../services/publicInfo.service';
import ReTextField from '../../components/ReTextField';
import validateInfo from './validateInfo';

const PublicInfo = () => {
    const classes = useStyles();
    const [info, setInfo] = useState('');
    const history = useHistory();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('info');

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const initValues = {
        info: ''
    }

    const handleCancel = () => {
        setEditable(false);
        setValues({ ...values, info: values.info });
    }

    const handleSave = () => {
        setLoading(true)
        publicInfoService.postPublicInfo({ Description: values.info }).then(response => {
            setInfo(values.info);
            setLoading(false);
            setSnackType('success');
            setSnackContent('Updated');
            setOpenSnack(true);
            setEditable(false)
        }).catch(error => {
            console.log(error);
            setSnackType('error');
            setSnackContent(error.message);
            setOpenSnack(true);
            setLoading(false);
        })
    };

    const {
        handleChange,
        values,
        setValues,
        errors,
        setErrors,
        handleSubmit,
    } = useForm(initValues, true, validateInfo, handleSave);


    const [editable, setEditable] = useState(false);


    useEffect(() => {
        publicInfoService.getPublicInfo().then(response => {
            const info = response.resultResponse;
            setValues({ info: info });
            setInfo(info);
        }).catch(error => {
            setError(error.message);
            console.log(error.message);
            //history.goBack();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container style={{ padding: 0, flexGrow: 1 }}>
            <Typography variant="h3" className={classes.bigTitle}>Profile</Typography>
            {!error && <form onSubmit={handleSubmit}>
                <Grid container direction='column' style={{ padding: 40 }}>
                    <Typography
                        variant='h5'
                        style={{ marginBottom: 20 }}
                    >
                        Public info
                    </Typography>
                    <ReTextField
                        name='info'
                        label='Description'
                        style={{ marginBottom: 16 }}
                        startIcon={<PermIdentityRoundedIcon />}
                        readOnly={!editable}
                        onChange={handleChange('info')}
                        value={values.info}
                        error={errors.info}
                    />
                    {editable
                        ? <Fragment>
                            <Grid container alignItems='center'>
                                <Grid item className={classes.wrapper}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        className={clsx({ [classes.buttonSuccess]: snackType === 'success' })}
                                        disabled={loading} >
                                        Save
                                    </Button>
                                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Grid>
                                <Grid item>
                                    <Button
                                        style={{ marginLeft: 10 }}
                                        variant='contained'
                                        color='secondary'
                                        type='reset'
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Fragment>
                        : <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                                setEditable(true);
                                setValues({ ...values, info: info });
                            }}
                        >
                            Edit
                        </Button>
                    }

                </Grid>

            </form>
            }
            <Snackbar
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnack} severity={snackType}>
                    {snackContent}
                </Alert>
            </Snackbar>
        </Container >
    )
};

export default PublicInfo;