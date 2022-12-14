import React from "react";
import { Link } from 'react-router-dom';
import { clearSearchQuery, clearFilter } from '../api/getterApi';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../App';
import { NavLink } from "react-router-dom";
import { getNumberOfUsers, getUserById, getUsers } from '../api/userApi'
import { Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box } from '@mui/material'
import { getProfileById } from "../api/profileApi";
import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";
function HomePage({ setCurrentUser }) {

    const currentUser = useContext(UserContext);
    console.log(currentUser);
    useEffect(() => {
        clearSearchQuery(); //ensures the search query is empty when the    properties list is re-accessed
        clearFilter(); //ensures the filters are empty when the properties list is re-accessed
    }, [])

    function logout() {
        setCurrentUser(undefined)
    }
    return (
        <>
        <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
            {/* <Grid container rows={3} columns={3}> */}
            <Grid item xs={12} sm={6} md={3}>
                <NavLink to="/properties" style={{ textDecoration: 'none' }}>
                    <Card elevation="10" sx={{ marginX: '1em' }}>
                        <CardHeader
                            avatar={<img src="https://cdn0.iconfinder.com/data/icons/places-16/24/house-door-512.png"
                                width="25em" />}
                            title={<h3>{currentUser.account_type == 1 ? 'Search Properties' : "My Properties"}</h3>} />
                        <CardContent sx={{ backgroundColor: 'white' }}>
                            <Typography>
                                {currentUser.account_type == 1 ? "Browse listings in your area" : "View Your Listings"}</Typography>
                        </CardContent>
                        <div style={{ maxHeight: '200px' }}>
                            <CardMedia
                                component="img"
                                height="500px"
                                sx={{ objectFit: 'cover' }}
                                image="https://images.pexels.com/photos/2077937/pexels-photo-2077937.jpeg?cs=srgb&dl=pexels-luis-quintero-2077937.jpg&fm=jpg"
                            />
                        </div>
                    </Card>
                </NavLink>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <NavLink to={"/profiles/" + currentUser.user_id} style={{ textDecoration: 'none' }}>
                    <Card xs={3} elevation="10" sx={{ marginX: '1em' }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: blue[500] }} aria-label="owner"></Avatar>}
                            title={<h3>Profile</h3>} />
                        <CardContent sx={{ backgroundColor: 'white' }}>
                            <Typography variant="p">
                                View and edit your profile
                            </Typography>
                        </CardContent>
                    </Card>
                </NavLink>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <NavLink to="/inbox" style={{ textDecoration: 'none' }}>
                    <Card elevation="10" sx={{ marginX: '1em' }}>
                        <CardHeader
                            avatar={<img src="https://icons.veryicon.com/png/o/internet--web/billion-square-cloud/mail-213.png"
                                width="25em" />}
                            title={<h3>Inbox</h3>} />
                        <CardContent sx={{ backgroundColor: 'white' }}>

                            <Typography variant="p">{
                                currentUser.account_type == 1 ?
                                    "View Your Application Status" : "See and respond to applicants"
                            }
                            </Typography>
                        </CardContent>
                    </Card>
                </NavLink>
            </Grid>

            {currentUser.account_type == 1 ? <>

            </> :
            <>
                <Grid item xs={12} sm={6} md={3}>
                    <NavLink to="/newListing" style={{ textDecoration: 'none' }}>
                        <Card elevation="10" sx={{ marginX: '1em' }}>
                            <CardHeader
                                avatar={<img src="https://cdn0.iconfinder.com/data/icons/places-16/24/house-door-512.png"
                                    width="25em" />}
                                title={<h3>Create New Listing</h3>} />
                            <CardContent>
                                <Typography variant="p">
                                    Create and add properties
                                </Typography>
                            </CardContent>
                        </Card>
                    </NavLink>
                </Grid>
            </>}
        </Grid>
            <Grid container>
                <Button sx={{ width: '40%', marginX: 'auto', marginY: "2%" }}
                    variant="outlined"
                    align="center"
                    onClick={logout}
                >Logout</Button>
            </Grid>
        </>
    )
}
export default HomePage;