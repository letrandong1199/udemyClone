import { useState, useEffect } from 'react';
import {
    Fab,
    Typography,
    Grid,
    Container,
    CircularProgress
} from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import { useStyles } from './styles';

import courseService from '../../services/course.service';

const ImagePanel = ({ id, course, loading, setCourse }) => {
    const classes = useStyles();
    const [preview, setPreview] = useState(course?.Thumbnail_Medium || '');
    const [isPending, setIsPending] = useState(loading || false);

    useEffect(() => {
        setIsPending(loading);
    }, [loading])

    const handleUpload = (event) => {
        setIsPending(true);
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onloadend = () => {
            courseService.updateOne(id, {
                Title: course.Title,
                Category_Id: course.Category.Id,
                Language_Id: course.Language.Id,
                Is_Completed: course.Is_Completed,
                Sub_Description: course.Sub_Description,
                Image: reader.result
            }).then(() => {
                setPreview(reader.result)
                let dic = { ...course };
                dic.Thumbnail_Medium = reader.result;
                setPreview(reader.result);
                setCourse(dic);
                setIsPending(false);
            }).catch(error => {
                console.log(error);
                setIsPending(false);
            })
        }
    }


    return (
        <Container className={classes.marginContainer}>
            <Typography variant="h5" className={classes.title}>
                Thumbnail
            </Typography>
            <Typography variant="body1" className={classes.caption}>
                {"This thumbnail will show in course card (small size) and detail course (large size). Recommend size: 750x422."}
            </Typography>
            <Grid container alignItems="center" className={classes.section}>
                <div
                    className={classes.thumbnail}
                    style={{
                        background: `url('${preview && preview !== ''
                            ? preview
                            : '/assets/image.svg'}') 
                            no-repeat center center content-box`,
                    }}
                >
                    {isPending && <div>
                        <CircularProgress
                            style={{
                                position: 'absolute',
                                top: 'calc(50%)',
                                left: 'calc(50% - 20px)',
                            }}
                        />
                    </div>
                    }
                </div>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ display: 'none', }}
                    onChange={handleUpload}
                />

                <label htmlFor="contained-button-file">
                    <Fab
                        color="primary"
                        aria-label="upload picture"
                        component="span">
                        <PhotoCameraIcon />
                    </Fab>
                </label>
            </Grid>

        </Container>
    )
}

export default ImagePanel;