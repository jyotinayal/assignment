import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../../component/post/post';
import Clock from './clock';
import { Box, Grid, Typography } from '@mui/material';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [countries, setCountries] = useState([]);
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

    return (
        <Box px={1}>
            <Grid container alignItems={'center'}>
                <Grid item xs={12} md={2}>
                    <Link to="/" style={{
                        display: 'inline-block',
                        padding: '15px 20px',
                        textDecoration: 'none',
                        color: 'white',
                        backgroundColor: '#007BFF',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}>Back</Link>
                </Grid>
                <Grid item xs={12} md={10}>
                    <Clock countries={countries} />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" my={1}>Profile Page</Typography>
                </Grid>
                <Grid item xs={12} container sx={{ border: '2px solid black' }} >
                    <Grid xs={12} md={6} p={1}>
                        <Grid item xs={12}><Typography varient="h3" sx={{ fontWeight: 'bold' }}>User Details</Typography></Grid>
                        <Grid item xs={12}>Name: {user?.name}</Grid>
                        <Grid item xs={12}>Username: {user?.username}</Grid>
                        <Grid item xs={12}>Catch Phrase: {user?.company.catchPhrase}</Grid>
                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Grid item xs={12}><Typography varient="h3" sx={{ fontWeight: 'bold' }}>Contact Information</Typography></Grid>
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
                    <Grid container spacing={1} p={1}>
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

