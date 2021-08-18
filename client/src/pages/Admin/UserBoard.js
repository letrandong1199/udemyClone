import {
    Backdrop,
    IconButton,
    CircularProgress,
    Snackbar,
} from '@material-ui/core';
import clsx from 'clsx';

import { Alert } from '@material-ui/lab';
import { DataGrid } from '@material-ui/data-grid';

import { useState, useEffect } from 'react';
import useStyles from './styles';
import userService from '../../services/user.service';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';

import AddInstructorDialog from './AddInstructorDialog';
import DetailRowDialog from './DetailRowDialog';

const UserBoard = () => {
    const [users, setUsers] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const [openAdd, setOpenAdd] = useState(false);

    const [refresh, setRefresh] = useState(null);

    useEffect(() => {
        setIsPending(true);
        userService.getAll().then(response => {
            const list = response.listAllResponse;
            const resultArray = list.map(elm => {
                elm['id'] = elm.Id;
                elm['Is_Blocked'] = Boolean(elm.Is_Blocked);
                elm['Status'] = elm.Is_Blocked ? 'Blocked' : 'Active';
                return elm
            });
            setIsPending(false);
            setUsers(resultArray)
        }).catch(error => {
            setError(error)
            setIsPending(false);
        })
    }, [refresh])

    const usersColumns = [
        {
            field: 'Id',
            headerName: 'Id',
            width: 90
        },
        {
            field: 'Name',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'Email',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'Role',
            headerName: 'Role',
            width: 150
        },
        {
            field: 'Role',
            headerName: 'Role',
            width: 150
        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 150,
            cellClassName: (params) =>
                clsx('super-app', {
                    negative: params.value === 'Active',
                    positive: params.value === 'Blocked',
                }),
        },
    ];

    const detailColumns = [
        {
            field: 'Id',
            headerName: 'Id',
            type: 'text',
        },
        {
            field: 'Name',
            headerName: 'Name',
            type: 'text'
        },
        {
            field: 'Email',
            headerName: 'Email',
            type: 'email'
        },
        {
            field: 'Role',
            headerName: 'Role',
            type: 'text'
        },

    ];

    const [open, setOpen] = useState(false);

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleClick = (event) => {
        setOpen(event.row);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setIsProcessing(true)
        userService.updateOne(open?.Id, open).then(response => {
            let array = [...users];
            let index = array.indexOf(open)

            if (index !== -1) {
                array.splice(index, 1);
                array.push(open);
                setUsers(array);
                setSnackType('success');
                setSnackContent('Updated')
                setOpenSnack(true);
                setOpen(false);
            }
            setIsProcessing(false)
        }).catch(error => {
            console.log(error);
            setSnackType('error');
            setSnackContent(error.message);
            setOpenSnack(true);
            setIsProcessing(false);
        })
    }

    const handleBlock = () => {
        setIsProcessing(true)
        return new Promise(() => {
            userService.updateStatus(open?.Id).then(response => {
                let array = [...users];
                let index = array.indexOf(open)

                if (index !== -1) {
                    array[index]['Is_Blocked'] = !array[index]['Is_Blocked'];
                    array[index]['Status'] = array[index]['Is_Blocked'] ? 'Blocked' : 'Active';
                    setUsers(array);
                }
                setIsProcessing(false)
                console.log('del', response);
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
        <div style={{ minHeight: 520, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={usersColumns}
                pageSize={5}
                error={error}
                loading={isPending}
                onRowClick={handleClick}
                className={classes.dataGridRoot}
                disableSelectionOnClick
            />
            <div style={{ position: 'absolute', top: 70, right: 100 }}>
                <IconButton
                    onClick={() => { setOpenAdd(true) }}
                >
                    <AddCircleOutlineRoundedIcon />
                </IconButton>
                <IconButton
                    onClick={() => { setRefresh(!refresh) }}
                >
                    <CachedRoundedIcon />
                </IconButton>
            </div>

            <DetailRowDialog
                setIsProcessing={setIsProcessing}
                setRefresh={setRefresh}
                refresh={refresh}
                open={open ? true : false}
                row={open}
                columns={detailColumns}
                onClose={() => setOpen(false)}
                onDelete={handleBlock}
                onUpdate={handleSave}
                readOnly
            />

            <AddInstructorDialog
                setIsProcessing={setIsProcessing}
                setRefresh={setRefresh}
                refresh={refresh}
                open={openAdd}
                onClose={() => setOpenAdd(false)}
            />

            <Backdrop className={classes.backdrop} open={isProcessing} onClick={handleClose}>
                <CircularProgress />
            </Backdrop>
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
        </div >
    )
};

export default UserBoard;
