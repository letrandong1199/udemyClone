import {
    AppBar,
    Typography,
    Grid,
    Dialog,
    IconButton,
    Button,
    Toolbar,
    Switch,
} from '@material-ui/core';
import { useState, useEffect, Fragment } from 'react';

import useStyles from './styles'
import CloseIcon from '@material-ui/icons/Close'

import useForm from '../../utils/useForm';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import validateInfo from './validateInfo';
import ReTextField from '../../components/ReTextField';

const DetailRowDialog = ({
    open,
    onClose,
    setRefresh,
    refresh,
    setIsProcessing,
    callback,
    onDelete,
    onUpdate,
    readOnly,
    row,
    columns = []
}) => {
    const classes = useStyles();
    const initValues = {
        email: '',
        name: '',
        id: '',
        role: '',
    }

    const {
        handleChange,
        values,
        setValues,
        errors,
        handleSubmit,
    } = useForm(initValues, true, validateInfo, onUpdate);
    const [editable, setEditable] = useState(false);

    const handleChangeSwitch = async (e) => {
        if (e?.target?.checked !== undefined) {
            const ret = await onDelete();
            if (ret) {
                setValues({ ...values, 'Is_Blocked': e.target.checked });
            }
        }

    }

    useEffect(() => {
        if (row) {
            setValues(row);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row])

    return (
        <Dialog
            open={open ? true : false}
            onClose={() => { setEditable(false); return onClose() }}
            className={classes.dialog}
        >
            <form onSubmit={handleSubmit}>
                <AppBar className={classes.dialogAppBar} style={{ position: 'static' }}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={onClose}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Detail
                        </Typography>
                        <div style={{ marginLeft: 'auto' }}>
                            {!readOnly &&
                                (editable
                                    ? <Button
                                        color='inherit'
                                        type='submit'
                                        startIcon={<SaveRoundedIcon />}
                                    >
                                        Save
                                    </Button>
                                    : <Button
                                        color='inherit'
                                        onClick={() => { setEditable(!editable) }}
                                        startIcon={<EditRoundedIcon />}
                                        disable={readOnly}
                                    >
                                        Edit
                                    </Button>
                                )
                            }
                            {values.Is_Blocked !== undefined
                                ?
                                <Fragment>
                                    Active

                                    <Switch
                                        checked={Boolean(values.Is_Blocked)}
                                        onChange={handleChangeSwitch}
                                        name="checkedA"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />

                                    Blocked
                                </Fragment>

                                : <Button
                                    color='inherit'
                                    startIcon={<BlockRoundedIcon />}
                                >
                                    Delete
                                </Button>}
                        </div>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    {columns.map((column, index) => <ReTextField
                        key={index}
                        name={column.field}
                        label={column.headerName}
                        placeholder={column.headerName}
                        value={values[column.field]}
                        onChange={handleChange(column.field)}
                        error={errors[column.field.toLowerCase()]}
                        readOnly={true}
                        type={column.type}
                        style={{ margin: 20 }}
                    />)}
                </Grid>
            </form>
        </Dialog>
    )
};

export default DetailRowDialog;