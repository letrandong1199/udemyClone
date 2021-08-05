import { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Button,
    FormControl,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    Switch,
    FormGroup,
    FormControlLabel,
    Grid,
    Snackbar,
    CircularProgress
} from '@material-ui/core';
import { Skeleton, Alert } from '@material-ui/lab';

import { useStyles } from './styles';
import promoteService from '../../services/promote.service';
import courseService from '../../services/course.service';

const PricingAndPublicPanel = ({ id, course, loading, setCourse }) => {
    const classes = useStyles();
    const [info, setInfo] = useState({
        Price: '',
        Promote: '',
        Is_Completed: false,
    })
    const [promotes, setPromotes] = useState([]);
    const [isPending, setIsPending] = useState([]);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    useEffect(() => {
        let dic = {
            Price: parseFloat(course.Price),
            Promote: course.Promote,
            Is_Completed: Boolean(course.Is_Completed),
        };
        setInfo(dic);
    }, [course, setCourse])

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return event;
        }
        setOpenSnack(false);
    };

    const handleSetIsPending = (index, loaded) => () => {
        let array = [...isPending];

        if (loaded) {
            let ix = isPending.indexOf(index)
            if (ix !== -1) {
                array.splice(ix, 1);
            }
        } else {
            array.push(index);
        }
        setIsPending(array);
    }
    //console.log(course);
    const handleLoadPromotes = () => {
        handleSetIsPending('promote', false)();
        promoteService.getAll().then(response => {
            const array = response.listAllResponse;
            if (array !== undefined) {
                setPromotes(array);
            }

            handleSetIsPending('promote', true)();
        }).catch(error => {
            handleSetIsPending('promote', true)();
            console.log(error);
        });
    }
    const handleChange = (key) => (event) => {
        let dic = { ...info };
        dic[key] = event.target.value;
        if (key === 'Is_Completed') {
            dic[key] = event.target.checked;
        }
        setInfo(dic);
    }
    const handleSave = async () => {
        handleSetIsPending('save', false)();
        courseService.updateOne(id, {
            Title: course.Title,
            Sub_Description: course.Sub_Description,
            Category_Id: course.Category.Id,
            Language_Id: course.Language.Id,
            Price: info?.Price,
            Promote: info?.Promote,
            Is_Completed: info?.Is_Completed,
        }).then(response => {
            let dic = { ...course, ...info };
            setCourse(dic);
            setSnackContent('Updated');
            setSnackType('success');
            setOpenSnack(true);
            handleSetIsPending('save', true)();
            return response;
        }).catch(error => {
            console.log(error);
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            handleSetIsPending('save', true)();
        })
    }

    return (
        <Container className={classes.marginContainer}>
            <Typography variant="h5" className={classes.title}>
                Pricing and public
            </Typography>
            <Grid className={classes.section}>
                {loading ? <Skeleton><TextField value='' /></Skeleton>
                    : <TextField
                        id="title"
                        label="Price"
                        type='number'
                        variant="outlined"
                        value={info?.Price}
                        fullWidth
                        onChange={handleChange('Price')}
                        style={{ marginBottom: 10 }}
                    />
                }
                {loading ? <Skeleton><Select value='' /></Skeleton>
                    : <FormControl
                        className={classes.formControl}
                        variant='outlined'
                        fullWidth
                    >
                        <InputLabel id="pm-label" >Promote</InputLabel>
                        <Select
                            labelId='pm-select-label'
                            id='pm-select'
                            value={info?.Promote || ''}
                            onChange={handleChange('Promote')}
                            label='Promote'
                            onOpen={handleLoadPromotes}
                        >
                            <MenuItem key={info?.Promote?.Id} value={info?.Promote}>
                                <em>{info?.Promote?.Promote}</em>
                            </MenuItem>
                            {isPending.includes('promote') ?
                                <Skeleton width='100%' height='50px'><MenuItem key={'ske'} /></Skeleton>
                                : promotes?.map(pm => (
                                    pm.Id !== info?.Promote?.Id && <MenuItem key={pm.Id} value={pm}>
                                        {pm.Promote}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                }
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={info?.Is_Completed}
                                onChange={handleChange('Is_Completed')}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label={info?.Is_Completed ? `Public` : `Private`}
                    />
                </FormGroup>
                <div style={{
                    width: '100%',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        onClick={handleSave}
                        style={{ marginLeft: 0 }}
                        disabled={isPending.includes('save')}
                    >
                        Public this course
                    </Button>
                    {isPending.includes('save') &&
                        <CircularProgress size='30px' color='primary' style={{ marginLeft: 10 }} />}
                </div>
            </Grid >

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

export default PricingAndPublicPanel;