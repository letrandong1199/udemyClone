/* eslint-disable no-undef */
import Navbar from '../components/Navbar/Navbar.jsx';
import Carousel from '../components/Carousel/Carousel';
import HomeSection from '../components/HomeSection/HomeSection.jsx';
import Footer from '../components/Footer/Footer.jsx';
import React from 'react';
import { courses } from '../utils/dataSample';
const courses1 = courses();
const courses2 = courses();

function Home(props) {
    return (
        <div>
            <Navbar handleToggleDark={props.handleToggle} />
            <Carousel />
            <HomeSection title="Most viewed courses" courses={courses1} />
            <HomeSection title="Most recent courses" courses={courses2} />
            <Footer />
        </div >
    )
}

export default Home;