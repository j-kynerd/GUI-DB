import React from "react";
import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Checkbox, FormControl, Button, FormControlLabel, FormLabel, Grid, Input, Menu, MenuItem, TextField, Switch, Typography } from "@mui/material";

function PropertyForm({ values, onChange, onSubmit }) {
    const tagOptions = ['College Town', 'Quiet Neighbourhood', 'Community', 'Nearby Attractions',
        'Public Transportation', 'Families', 'Low Crime'];

    let currentUser = useContext(UserContext);
    useEffect(() => {
        onChange({ owner: currentUser.userId });
    }, [])
    return <>
        <Box container>
            <Grid m={5}>
                <TextField
                    label="Address"
                    required
                    value={values.address}
                    id="Address"
                    onChange={e => onChange({ address: e.target.value })}>
                </TextField>
                <TextField
                    label="Monthly Rent"
                    required
                    value={values.monthlyRent}
                    id="MonthlyRent"
                    onChange={e => onChange({ monthlyRent: e.target.value })}>
                </TextField>
                <TextField
                    label="Capacity"
                    required
                    value={values.capacity}
                    id="Capacity"
                    onChange={e => onChange({ capacity: e.target.value })}>
                </TextField>
                <TextField
                    label="Size (sqft)"
                    required
                    value={values.sqft}
                    id="Size"
                    onChange={e => onChange({ sqft: e.target.value })}>
                </TextField>

                <FormControl>
                    <Typography>This Property Allows Smoking</Typography>
                    <Switch
                        value={values.smoking}
                        onChange={e => onChange({ allowsSmoking: e.target.checked })}></Switch>
                </FormControl>
                <FormControl>
                    <Typography>This Property Allows Pets</Typography>
                    <Switch label="Pet Friendly"
                        value={values.petFriendly}
                        onChange={e => onChange({ allowsPets: e.target.checked })}></Switch>
                </FormControl>
                <Grid>
                    {
                        tagOptions.map(x => {
                            return <>
                                <FormControlLabel value={x}
                                    label={x}
                                    control={<Checkbox
                                        onChange={e => {
                                            let t = 'tag' + (+tagOptions.indexOf(x) + 1);
                                            onChange({ [t]: e.target.checked })
                                        }}></Checkbox>} />
                            </>
                        })
                    }
                </Grid>
                <Button onClick={onSubmit}>Submit</Button>
            </Grid>
        </Box>
    </>
}
export default PropertyForm