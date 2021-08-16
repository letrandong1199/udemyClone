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
import userService from '../../services/user.service';
import ReTextField from '../../components/ReTextField';
import validateInfo from './validateInfo';

const AccountInfo = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
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
        email: '',
        password: '',
        newPassword: '',
        name: '',
    }

    const handleCancel = (id) => (event) => {
        const index = editable.indexOf(id);
        if (index !== -1) {
            let array = [...editable];
            array.splice(index, 1);
            setEditable(array);
            setValues({ ...values, name: name })
            setErrors({ ...errors, name: '' })
        }
    }

    const handleSave = (id) => () => {
        if (id === 'name') {
            if (errors.name !== '') {
                return;
            }
            setLoading(true)
            userService.updateInfo({ Name: values.name }).then(response => {
                setName(values.name);
                setLoading(false);
                setSnackType('success');
                setSnackContent('Updated');
                setOpenSnack(true);

                const index = editable.indexOf(id);
                if (index !== -1) {
                    const array = [...editable];
                    array.splice(index, 1);
                    setEditable(array);
                    setErrors({ ...errors, name: '' })
                }
            }).catch(error => {
                console.log(error);
                setSnackType('error');
                setSnackContent(error.message);
                setOpenSnack(true);
                setLoading(false);
            })
        }
        else if (id === 'pass') {
            setLoading(true)
            userService.changePassword({
                Password: values.password,
                New_Password: values.newPassword
            }).then(response => {
                setLoading(false);
                setSnackType('success');
                setSnackContent('Updated');
                setOpenSnack(true);
                const index = editable.indexOf(id);
                if (index !== -1) {
                    const array = [...editable];
                    array.splice(index, 1);
                    setEditable(array);
                    setErrors({ ...errors, name: '' })
                }
            }).catch(error => {
                console.log(error);
                setSnackType('error');
                setSnackContent(error.message);
                setOpenSnack(true);
                setLoading(false);
            })
        }
    }


    const {
        handleChange,
        values,
        setValues,
        errors,
        setErrors,
        handleSubmit,
    } = useForm(initValues, true, validateInfo, handleSave);


    const [editable, setEditable] = useState([]);

    const handleClickEdit = (id) => () => {
        setEditable([...editable, id])
        if (id === 'name') {
            setName(values.name);
        }
    }

    useEffect(() => {
        userService.getUserBoard().then(response => {
            const user = response.resultResponse
            setValues({ ...values, name: user.Name, email: user.Email });
            setName(user.name);
        }).catch(error => {
            setError(error.message);
            history.goBack();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container style={{ padding: 0, flexGrow: 1 }}>
            <Typography variant="h3" className={classes.bigTitle}>Profile</Typography>
            <Avatar
                className={classes.avatar}
                src={values?.Thumbnail}
            >
                AV
                <Button color="primary" className={classes.avatar.hideText}>Edit</Button>
            </Avatar>
            {!error && <form onSubmit={handleSubmit}>
                <Grid container style={{ margin: 20, width: 'auto' }}>
                    <Grid item xs={12} sm={6} container direction="column" style={{ padding: 20 }}>
                        <Typography
                            variant='h5'
                            style={{ marginBottom: 20 }}
                        >
                            Personal info
                        </Typography>
                        <ReTextField
                            name='name'
                            label='Full name'
                            style={{ marginBottom: 16 }}
                            startIcon={<PermIdentityRoundedIcon />}
                            readOnly={!editable.includes('name')}
                            onChange={handleChange('name')}
                            value={values.name}
                            error={errors.name}
                        />
                        {editable.includes('name')
                            ? <Fragment>
                                <Grid container alignItems="center">
                                    <Grid item className={classes.wrapper}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSave('name')}
                                            className={clsx({ [classes.buttonSuccess]: snackType === 'success' })}
                                            disabled={loading} >
                                            Save
                                        </Button>
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            style={{ marginLeft: 10 }}
                                            variant="contained"
                                            color="secondary"
                                            type="reset"
                                            onClick={handleCancel('name')}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Fragment>
                            : <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleClickEdit('name')}
                            >
                                Edit
                            </Button>
                        }

                    </Grid>
                    <Grid item xs={12} sm={6} container direction="column" style={{ padding: 20 }}>
                        <Typography variant="h5" style={{ marginBottom: 20 }}>Account info</Typography>
                        <ReTextField
                            name='pass'
                            label="Password"
                            style={{ marginBottom: 16 }}
                            type="password"
                            startIcon={<LockOutlinedIcon />}
                            readOnly={!editable.includes('pass')}
                            onChange={handleChange('newPassword')}
                            value={values?.newPassword}
                            error={errors.password}
                        />

                        {editable.includes('pass')
                            ? <Fragment>
                                <ReTextField
                                    type='password'
                                    name='cur-pass'
                                    label="Current password"
                                    style={{ marginBottom: 16 }}
                                    startIcon={<LockOutlinedIcon />}
                                    readOnly={!editable.includes('pass')}
                                    onChange={handleChange('password')}
                                    value={values?.password}
                                    error={errors.password}
                                />
                                <Grid container alignItems="center">
                                    <Grid item className={classes.wrapper}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSave('pass')}
                                            className={clsx({ [classes.buttonSuccess]: snackType === 'success' })}
                                            disabled={loading}
                                        >
                                            Save
                                        </Button>
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            style={{ marginLeft: 10 }}
                                            variant="contained"
                                            color="secondary"
                                            type="reset"
                                            onClick={handleCancel('pass')}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>

                                </Grid>

                            </Fragment>
                            : <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleClickEdit('pass')}
                            >
                                Change password
                            </Button>
                        }



                    </Grid>

                </Grid>
            </form>
            }
            <Snackbar
                open={openSnack}
                autoHideDuration={4000}
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

export default AccountInfo;