import { Button, FormControl, InputLabel, Select, MenuItem, Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Clock = ({ countries }) => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    useEffect(() => {
        fetchTime();
        return () => clearInterval(timerId);
    }, [selectedCountry]);

    useEffect(() => {
        if (isTimerRunning) {
            startTimer();
        } else {
            clearInterval(timerId);
        }
        return () => clearInterval(timerId);
    }, [isTimerRunning, currentTime]);

    let timerId;

    const fetchTime = async () => {
        try {
            const response = await fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
            const data = await response.json();
            if (data.utc_datetime && new Date(data.utc_datetime).getTime()) {
                setCurrentTime(data.utc_datetime);
            } else {
                console.error('Invalid date/time format received:', data);
            }
        } catch (error) {
            console.error('Error fetching time:', error);
        }
    };

    const startTimer = () => {
        clearInterval(timerId);
        timerId = setInterval(() => {
            fetchTime();
        }, 1000);
    };

    const handleCountryChange = (event) => {
        const newCountry = event.target.value;
        setSelectedCountry(newCountry);
        setIsTimerRunning(true);
    };

    const toggleTimer = () => {
        setIsTimerRunning((prevIsTimerRunning) => !prevIsTimerRunning);
    };

    return (
        <Grid container>
            <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Select an Option</InputLabel>
                    <Select value={selectedCountry} label="Select an Option" onChange={handleCountryChange}>
                        <MenuItem value="">Select a country</MenuItem>
                        {countries.map(country => (
                            <MenuItem key={country} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
                <Typography sx={{ textAlign: 'center', margin: '20px 0' }} varient="h3">{currentTime}</Typography>
            </Grid>

            <Grid xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={toggleTimer} sx={{
                    display: 'inline-block',
                    padding: '5px 20px',
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: '#007BFF',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#007BFF',
                    },
                }}>
                    {isTimerRunning ? 'Pause' : 'Start'}
                </Button>
            </Grid>
        </Grid>
    );
};

export default Clock;
