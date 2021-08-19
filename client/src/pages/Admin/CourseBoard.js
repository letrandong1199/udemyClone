import {
    Grid,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import clsx from 'clsx';

import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useState, useEffect } from 'react';
import useStyles from './styles'
import courseService from '../../services/course.service';
import DetailRowDialog from './DetailRowDialog';


const CourseBoard = () => {
    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [refresh, setRefresh] = useState(null);


    useEffect(() => {
        setIsPending(true);
        courseService.getAll().then(response => {
            const list = response.listAllResponse;
            const resultArray = list.map(elm => {
                elm['id'] = elm.Id;
                elm['Author_Name'] = elm.Author.Name;
                elm['Category_Name'] = elm.Category.Name;
                elm['Is_Blocked'] = Boolean(elm['Is_Blocked']);
                elm['Status'] = elm.Is_Blocked ? 'Blocked' : 'Active';
                return elm
            });

            setIsPending(false);
            setCourses(resultArray)
        }).catch(error => {
            setError(error)
            setIsPending(false);
        })
    }, [refresh])

    const coursesColumns = [
        { field: 'Id', headerName: 'Id', width: 90 },
        {
            field: 'Title',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'Sub_Description',
            headerName: 'Sub Description',
            width: 250,
            hide: true,
        },
        {
            field: 'Description',
            headerName: 'Description',
            width: 250,
            hide: true,
        },
        {
            field: 'Thumbnail_Small',
            headerName: 'Thumbnail Small',
            width: 250,
            hide: true,
        },
        {
            field: 'Thumbnail_Medium',
            headerName: 'Thumbnail Medium',
            width: 250,
            hide: true,
        },
        {
            field: 'Thumbnail_Large',
            headerName: 'Thumbnail Large',
            width: 250,
            hide: true,
        },
        {
            field: 'Price',
            headerName: 'Price',
            width: 150,
        },
        {
            field: 'Rating',
            headerName: 'Rating',
            width: 130,
        },
        {
            field: 'Category_Name',
            headerName: 'Category',
            width: 150,
        },
        {
            field: 'Author_Name',
            headerName: 'Author',
            width: 150,
        },
        {
            field: 'Promote_Rate',
            headerName: 'Promote Rate',
            width: 150,
            hide: true,
        },
        {
            field: 'Language_Id',
            headerName: 'Language',
            width: 150,
            hide: true,
        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 130,
            cellClassName: (params) =>
                clsx('super-app', {
                    negative: params.value === 'Active',
                    positive: params.value === 'Blocked',
                }),
        }

    ];

    const [open, setOpen] = useState(false);


    const handleClick = (event) => {
        setOpen(event.row);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleBlock = () => {
        setIsProcessing(true)
        return new Promise(() => {
            courseService.updateStatus(open?.Id).then(response => {
                let array = [...courses];
                let index = array.indexOf(open)

                if (index !== -1) {
                    array[index]['Is_Blocked'] = !array[index]['Is_Blocked'];
                    array[index]['Status'] = array[index]['Is_Blocked'] ? 'Blocked' : 'Active';
                    setCourses(array);
                }
                setIsProcessing(false)
                return true;
            }).catch(error => {
                console.log(error);
                setIsProcessing(false);
            })
        }
        )
    }


    const classes = useStyles();
    return (
        <Grid style={{ minHeight: 520, width: '100%' }}>
            <DataGrid
                rows={courses}
                columns={coursesColumns}
                autoPageSize
                error={error}
                loading={isPending}
                onRowClick={handleClick}
                disableSelectionOnClick
                className={classes.dataGridRoot}
                components={{
                    Toolbar: GridToolbar,
                }}
            />

            <DetailRowDialog
                setIsProcessing={setIsProcessing}
                setRefresh={setRefresh}
                refresh={refresh}
                open={open ? true : false}
                row={open}
                columns={coursesColumns}
                onClose={() => setOpen(false)}
                onDelete={handleBlock}
                readOnly
            />


            <Backdrop className={classes.backdrop} open={isProcessing} onClick={handleClose}>
                <CircularProgress />
            </Backdrop>
        </Grid>
    )
};

export default CourseBoard;

