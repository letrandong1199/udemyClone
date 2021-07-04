/* eslint-disable no-undef */
import './App.css';
import Navbar from './components/Navbar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-animated-slider';
import horizontalCss from 'react-animated-slider/build/horizontal.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  }
}));


function App() {
  const content = [
    {
      image: 'assets/3.jpg',
      title: 'Course 1',
      description: 'Course about a bout bla bal bal.',
      button: 'Join now'
    }
  ];

  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Slider classNames={horizontalCss}>
        {content.map((item, index) => (
          <div
            key={index}
            style={{ background: `url('${item.image}') no-repeat center center` }}
            className={classes.center}
          >
            <div className="dd">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <button>{item.button}</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default App;
