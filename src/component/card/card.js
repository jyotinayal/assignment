import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <Card sx={{ border: '2px solid #007BFF',borderRadius: '8px', margin: '10px', cursor: 'pointer'}}>
      <CardContent>
      <Typography variant="h5" component="div">
          <Link to={`/user/${user.id}`}>{user.name}</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
