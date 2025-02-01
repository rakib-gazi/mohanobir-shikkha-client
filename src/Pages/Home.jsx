import React from 'react';
import SwiperSlider from '../Components/SwiperSlider';
import About from '../Components/About';
import Choose from '../Components/Choose';
import Pricing from '../Components/Pricing';
import { Helmet } from 'react-helmet';
import HomeHero from './HomeHero';

const Home = () => {
    return (
        <div>
        
            <Helmet>
                <title>হোম | মহানবীর শিক্ষা</title>
            </Helmet>
            <HomeHero></HomeHero>
        </div>
    );
};

export default Home;