import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../../component/card/card';
import { Box, Grid, Typography } from '@mui/material';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" my={1}>User Directory</Typography>
                </Grid>
                {users.map((user) => (
                    <Grid item xs={12} md={6} lg={4}>
                        <UserCard key={user.id} user={user} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default UserList;
