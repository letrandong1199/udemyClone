/* eslint-disable no-undef */
import './App.css';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import ProductCardV from './components/ProductCardV';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


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
    padding: '20px'
  },
  homeSection: {
    backgroundColor: 'rgb(240, 238, 230)',
    padding: '10px',
    justifyContent: 'center'
  }
}));



function App() {


  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Carousel />
      <Typography variant="h6" className={classes.bigTitle}>Most view courses</Typography>
      <Grid container
        spacing={3}
        className={classes.homeSection}
      >
        <ProductCardV />
      </Grid>
      <Typography>Hello</Typography>
    </div>
  )
}

export default App;
