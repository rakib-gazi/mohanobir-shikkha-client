import React from 'react';

import { Helmet } from 'react-helmet';
import HomeHero from './HomeHero';

const Home = () => {
    return (
        <div>
        
            <Helmet>
                <title>হোম | মহানবীর শিক্ষা</title>
                <meta name="description" content="মহানবীর শিক্ষা - ২০২৫ ইং" />
            </Helmet>
            <HomeHero></HomeHero>
        </div>
    );
};

export default Home;