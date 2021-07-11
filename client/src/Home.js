/* eslint-disable no-undef */
import './App.css';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import HomeSection from './components/HomeSection';
import Footer from './components/Footer';
import Card from '@material-ui/core/Card';

import React from 'react';

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

]



function Home() {
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

export default Home;