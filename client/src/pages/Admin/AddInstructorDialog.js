import {
    AppBar,
    Typography,
    Grid,
    Dialog,
    IconButton,
    Button,
    Toolbar,
} from '@material-ui/core';


import useStyles from './styles'
import userService from '../../services/user.service';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CloseIcon from '@material-ui/icons/Close'

import useForm from '../../utils/useForm';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import validateInfo from './validateInfo';
import ReTextField from '../../components/ReTextField';

const AddInstructorDialog = ({
    open,
    onClose,
    setRefresh,
    refresh,
    setIsProcessing,
}) => {
    const classes = useStyles();
    const initValues = {
        email: '',
        name: '',
        password: '',
    }

    const handleAdd = () => {
        setIsProcessing(true)
        userService.postOne({
            Email: values.email,
            Name: values.name,
            Password: values.password
        }).then(response => {
            setIsProcessing(false);
            setRefresh(!refresh);
            return onClose();
        }).catch(error => {
            console.log(error);
            setIsProcessing(false);
            setErrors({ ...errors, email: error.message });
        })
    }
    //() => { setOpenAdd(false) }
    const {
        handleChange,
        values,
        errors,
        setErrors,
        handleSubmit,
    } = useForm(initValues, true, validateInfo, handleAdd);

    return (
        <Dialog open={open} onClose={onClose} className={classes.dialog}>
            <form onSubmit={handleSubmit}>
                <AppBar className={classes.dialogAppBar}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={onClose}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            Add user
                        </Typography>
                        <Button
                            color='inherit'
                            type='submit'
                            startIcon={<AddCircleOutlineRoundedIcon />}
                            style={{ marginLeft: 'auto' }}
                        >
                            Add
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <ReTextField
                        name='email'
                        label="Email"
                        placeholder="email@email.com"
                        value={values.email}
                        onChange={handleChange('email')}
                        error={errors.email}
                        startIcon={<MailOutlineRoundedIcon />}
                        type='email'
                        style={{ margin: 20 }}
                    />
                    <ReTextField
                        name='name'
                        label="Full name"
                        placeholder="Enter your full name"
                        value={values.name}
                        onChange={handleChange('name')}
                        error={errors.name}
                        startIcon={<PermIdentityRoundedIcon />}
                        style={{ margin: 20 }}
                    />
                    <ReTextField
                        name='password'
                        label="Password"
                        placeholder="Create password"
                        value={values.password}
                        onChange={handleChange('password')}
                        error={errors.password}
                        startIcon={<LockOutlinedIcon />}
                        style={{ margin: 20 }}
                        type='password'
                    />
                </Grid>
            </form>
        </Dialog >
    )
};

export default AddInstructorDialog;