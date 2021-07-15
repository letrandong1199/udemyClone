/* eslint-disable no-undef */
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Home from './pages/Home/Home.jsx';
import DetailCourse from './pages/DetailCourse';
import { unstable_createMuiStrictModeTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { lightTheme, darkTheme } from './theme';


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


function App() {
  const classes = useStyles();
  const [dark, setDark] = React.useState(false)

  const theme = unstable_createMuiStrictModeTheme({
    palette: {
      type: dark ? 'dark' : 'light',
    },
  })
  const handleToggle = () => {
    setDark(!dark);
    console.log(dark);
  }
  return (
    <MuiThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Home handleToggle={handleToggle} />
    </MuiThemeProvider>
  )
}

export default App;
