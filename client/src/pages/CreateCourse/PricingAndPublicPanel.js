import { useState, useEffect } from 'react';
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
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

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
    const [isPending, setIsPending] = useState(false);

    const handleLoadPromotes = () => {
        setIsPending(true)
        promoteService.getAll().then(response => {
            console.log(response);
            const array = response.data.message.listAllResponse;
            if (array !== undefined) { setPromotes(array); }
            setIsPending(false)
        }).catch(error => {
            setIsPending(false);
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
        courseService.updateOne(id, {
            Title: course.Title,
            Sub_Description: course.Sub_Description,
            Category_Id: course.Category.Id,
            Language_Id: course.Language.Id,
            Price: info?.Price,
            Promote_Id: info?.Promote_Id,
            Is_Completed: info?.Is_Completed,
        }).then(response => {
            console.log('Update', response);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <Container className={classes.marginContainer}>
            <Typography variant="h5" className={classes.title}>
                Pricing and public
            </Typography>
            <TextField
                id="title"
                label="Price"
                type='number'
                variant="outlined"
                value={info?.Price || ''}
                fullWidth
                onChange={handleChange('Price')}
                style={{ marginBottom: 10 }}
            />
            <FormControl
                className={classes.formControl}
                variant='outlined'
                fullWidth
            >
                <InputLabel id="pm-label" >Promote</InputLabel>
                <Select
                    labelId='pm-select-label'
                    id='pm-select'
                    value={info?.Promote_Id || ''}
                    onChange={handleChange('Promote_Id')}
                    label='Promote'
                    onOpen={handleLoadPromotes}
                >

                    {isPending ? <Skeleton variant='h6'></Skeleton>
                        : promotes?.map(promote => (
                            <MenuItem key={promote.Id} value={promote.Id}>
                                {promote.Promote}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
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
            <Button
                style={{ marginLeft: 0 }}
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleSave}
            >Public this course</Button>
        </Container >
    )
};

export default PricingAndPublicPanel;