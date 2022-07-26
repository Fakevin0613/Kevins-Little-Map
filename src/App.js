import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';


import { getPlacesData } from './api'
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import Footer from './components/Footer/Footer';


const App = () => {
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClick, setChildClick] = useState(null);

    const [places, setPlaces] = useState([]);
    const [isloading, setIsloading] = useState(false);

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('0');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, []);

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsloading(true)
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data);
                    setIsloading(false)
                }
                )
        }

    }, [bounds, type, rating]);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked={setChildClick}
                        rating={rating}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <List
                        places={places}
                        childClick={childClick}
                        isLoading={isloading}
                        type={type}
                        rating={rating}
                        setType={setType}
                        setRating={setRating}
                    />
                </Grid>
            </Grid>
            <Footer></Footer>
        </>
    );
}

export default App;