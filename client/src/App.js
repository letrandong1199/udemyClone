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
  }
}));

const courses = [
  {
    title: 'Course 1',
    thumb: 'assets/1.jpg',
    author: 'Author 1',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  },
  {
    title: 'Course 2',
    thumb: 'assets/2.jpg',
    author: 'Author 2',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  },
  {
    title: 'Course 1',
    thumb: 'assets/1.jpg',
    author: 'Author 1',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  },
  {
    title: 'Course 2',
    thumb: 'assets/2.jpg',
    author: 'Author 2',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  },
  {
    title: 'Course 1',
    thumb: 'assets/1.jpg',
    author: 'Author 1',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  },
  {
    title: 'Course 2',
    thumb: 'assets/2.jpg',
    author: 'Author 2',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  }
]

const courses2 = [
  {
    title: 'Course 1',
    thumb: 'assets/1.jpg',
    author: 'Author 1',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  },
  {
    title: 'Course 2',
    thumb: 'assets/2.jpg',
    author: 'Author 2',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  },
  {
    title: 'Course 1',
    thumb: 'assets/1.jpg',
    author: 'Author 1',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  },
  {
    title: 'Course 2',
    thumb: 'assets/2.jpg',
    author: 'Author 2',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  },
  {
    title: 'Course 1',
    thumb: 'assets/1.jpg',
    author: 'Author 1',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  },
  {
    title: 'Course 2',
    thumb: 'assets/2.jpg',
    author: 'Author 2',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
  }
]

function App() {
  return (
    <div>
      <Navbar />
      <Carousel />
      <HomeSection title="Most view course" courses={courses} />
      <HomeSection title="Most view recent" courses={courses2} />
      <Footer />

    </div >
  )
}

export default App;
