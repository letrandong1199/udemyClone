import Navbar from "../../components/Navbar/Navbar.jsx";
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment'
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import React from 'react';
import useStyles from './styles'
import useFetch from '../../utils/useFetch';
import { Avatar } from "@material-ui/core";

function Profile(props) {
    const classes = useStyles();
    const [uname, setUname] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const id = window.sessionStorage.getItem('user_id');
    console.log(id);
    const { data, isPending, error } = useFetch(`http://localhost:8000/users/${id}`)
    const [editable, setEditable] = React.useState(false);
    React.useEffect(() => {
        console.log(data);
    }, [data])
    const [onHover, setOnHover] = React.useState(false);
    return (
        <div className={classes.root}>
            <Navbar />
            <Container style={{ padding: 0 }}>
                <Typography variant="h3" className={classes.bigTitle}>Profile</Typography>
                <Avatar className={classes.avatar}
                >AV
                    <Button className={classes.avatar.hideText}>Edit</Button>
                </Avatar>
                <Grid container style={{ margin: 20, width: 'auto' }} zeroMinWidth>
                    <Grid item xs={6} container direction="column" style={{ padding: 20 }}>
                        <Typography variant="h5" style={{ marginBottom: 20 }}>Personal info</Typography>
                        <form style={{ maxWidth: 580, }}>
                            <TextField id="txt-fullname" variant="outlined" require="true" fullWidth label="Full name"
                                style={{ marginBottom: 16 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                required
                                disabled={!editable}
                                onChange={(event) => setName(event.target.value)}
                                value={isPending ? 'loading...' : data.name}
                            />

                            <TextField id="txt-uname" variant="outlined" require="true" fullWidth label="Username"
                                style={{ marginBottom: 16 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                required
                                disabled={!editable}
                                onChange={(event) => setUname(event.target.value)}
                                value={isPending ? 'loading...' : data.uname}
                            />
                            <Button variant="outlined" color="primary">Edit</Button>
                        </form>
                    </Grid>
                    <Grid item xs={6} container direction="column" style={{ padding: 20 }}>
                        <Typography variant="h5" style={{ marginBottom: 20 }}>Account info</Typography>
                        <form>
                            <TextField id="txt-pass" variant="outlined" require="true" fullWidth label="Password"
                                style={{ marginBottom: 16 }}
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                disabled
                                required
                                onChange={(event) => setPassword(event.target.value)}
                                value={isPending ? 'loading...' : data.password}
                            />

                            <Button variant="outlined" color="primary">Change password</Button>
                        </form>

                    </Grid>
                </Grid>
            </Container>
        </div>
    )
};

export default Profile;