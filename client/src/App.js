/* eslint-disable no-undef */
import './App.css';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import HomeSection from './components/HomeSection';
import Footer from './components/Footer';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment'
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import Home from './Home';
import RegisterAndLogin from './components/RegisterAndLogin';
import DetailCourse from './DetailCourse';


const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '10px',
    maxWidth: 345,
    //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
    boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    position: 'relative'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    //height: '100vh',
    display: 'flex',
    textAlign: 'center',
    //flexDirection: 'column',
    //position: 'absolute',
    //top: '50%',
    //left: '50%',
    //transform: 'translate(-50 %, -50 %)'
  },
  price: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  },
  bigTitle: {
    marginBottom: '10px',
    textAlign: 'center',
    backgroundColor: 'rgb(55, 51, 51)',
    color: 'whitesmoke',
    padding: '35px'
  },
  homeSection: {
    backgroundColor: 'rgb(240, 238, 230)',
    padding: '10px',
    justifyContent: 'space-arounds'
  },
  loginSection: {
    //margin: '50px',
    //maxWidth: '1000px',
    //top: '500px',
    //left: '500px',
    //marginLeft: '200px',
    //marginRight: '200px',
    // padding: 20,
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 700,
    minHeight: 500,
  },
  input: {
    //position: 'relative',
    //width: '555px',
    height: '60px',
    fontSize: '40px',
    borderRadius: '20px !important',
    //margin: '20px',
    //marginLeft: theme.spacing(2),
    //marginRight: theme.spacing(2),
    //width: '25ch',
  },
  button: {

    //width: '100%',
    height: '50px',
    margin: 10,
  }
}));

const useStylesReddit = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
  },
}));

function RedditTextField(props) {
  const classes = useStylesReddit();

  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}






function App() {
  const classes = useStyles();

  return (
    <div>
      <DetailCourse />
    </div>
  )
}

export default App;
