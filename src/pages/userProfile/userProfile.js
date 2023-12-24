import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Clock from '../../component/clock/clock';
import Post from '../../component/post/post';
import { Box, Button, Grid, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [clockPaused, setClockPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        // Fetch user details
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => setUser(response.data))
            .catch(error => console.error(error));

        // Fetch user posts
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));

        // Fetch list of countries
        axios.get('http://worldtimeapi.org/api/timezone')
            .then(response => setCountries(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleCountryChange = async (event) => {
        const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry);

        // Fetch current time for the selected country
        try {
            const response = await axios.get(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
            const { datetime } = response.data;
            setCurrentTime(datetime);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleClock = () => {
        setClockPaused(prevPaused => !prevPaused);
    };

    return (
        <Box px={1}>
            <Grid container alignItems={'center'}>
                <Grid item xs={12} md={2}>
                    <Link to="/" style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        color: 'white',
                        backgroundColor: '#007BFF',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}>Back</Link>
                </Grid>
                <Grid item xs={12} md={3}>
                <FormControl fullWidth>
      <InputLabel id="select-label">Select an Option</InputLabel>
                    <Select value={selectedCountry}  label="Select an Option" onChange={handleCountryChange}>
                        <MenuItem value="">Select a country</MenuItem>
                        {countries.map(country => (
                            <MenuItem key={country} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Clock paused={clockPaused} selectedCountry={selectedCountry} />
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={toggleClock} sx={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        color: 'white',
                        backgroundColor: '#007BFF',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}>
                        {clockPaused ? 'Start' : 'Pause'}
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" my={1}>Profile Page</Typography>
                </Grid>
                <Grid item xs={12} container sx={{ border: '2px solid black' }}>
                    <Grid xs={12} md={6}>
                        <Grid item xs={12}><h3>User Details</h3></Grid>
                        <Grid item xs={12}>Name: {user?.name}</Grid>
                        <Grid item xs={12}>Username: {user?.username}</Grid>
                        <Grid item xs={12}>Catch Phrase: {user?.company.catchPhrase}</Grid>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Grid item xs={12}><h3>Contact Information</h3></Grid>
                        <Grid item xs={12}>Address: {user?.address.street}, {user?.address.suite}, {user?.address.city}</Grid>
                        <Grid item xs={12}>Email: {user?.email}</Grid>
                        <Grid item xs={12}>Phone: {user?.phone}</Grid>
                    </Grid>
                </Grid>
            </Grid>

            {user && (
                <>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" my={1}>Post</Typography>
                </Grid>
                <Grid container spacing={1}>
                    {posts.map(post => (
                        <Grid item xs={12} md={4}>
                            <Post key={post.id} post={post} title={post?.title} content={post?.body} />
                        </Grid>
                    ))}
                </Grid></>
            )}
        </Box>
    );
};

export default UserProfile;

