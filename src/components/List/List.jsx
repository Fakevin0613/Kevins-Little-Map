import React from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import { useState, useEffect, createRef} from 'react';
import useStyle from './styles';

const List = ({ places, childClick, isLoading}) => {
    const classes = useStyle();
    const [type, setType] = useState('restaurant');
    const [rating, setRating] = useState('0');
    const [elRefs, setElRefs] = useState([]);

    console.log({childClick})

    useEffect(() => {
        console.log(places)
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
        setElRefs(refs)
        console.log({elRefs})
    }, [places]);

    return (
        <div className={classes.container}>
            {isLoading? (
                <div className={classes.loading}>
                    <CircularProgress size = "6rem"></CircularProgress>
                </div>
            ) : (
            <>
            <div className={classes.topBar}>
            <Typography variant="h4">
                Where are you heading to?
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel>What you are looking for?</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurant">Restaurant</MenuItem>
                    <MenuItem value="Hotels">Hotels</MenuItem>
                    <MenuItem value="Attractions">Attractions</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value="0">All</MenuItem>
                    <MenuItem value="2">Rating above 2.0</MenuItem>
                    <MenuItem value="3">Rating above 3.0</MenuItem>
                    <MenuItem value="4">Rating above 4.0</MenuItem>
                    <MenuItem value="4.5">Rating above 4.5</MenuItem>
                </Select>
            </FormControl>
            </div>

            <Grid container spacing = {3} className={classes.list}>
                {places?.map((place ,i) => (
                    place.name? (
                        <Grid ref = {elRefs[i]} item key = {i} xs={12}>
                            <PlaceDetails place = {place} selected = {Number(childClick) === i} refProp = {elRefs[i]} />    
                        </Grid> 
                    ) : null
                ))}
            </Grid>
            </>
            )}
        </div>
    )
}

export default List;