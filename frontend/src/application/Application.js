import { TextArea, Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box } from '@mui/material'
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import ApplicationForm from './ApplicationForm';
import { PropertyList } from '../data/PropertyList'
import { getPropertyById } from '../api/propertyApi';
import { addApplication, getApplications } from '../api/applicationApi'
//import createApplication
let applicationValues = {
    tenant: '',
    landlord: '',
    property_id: '',
    response: 0,
    application_id: ''
}
function Application() {
    let id = useParams().id;
    let [currentProperty, setCurrentProperty] = useState({});
    const [values, setValues] = useState(applicationValues);
    let currentUser = useContext(UserContext)
    let [currLord, setCurrLord] = useState({});

    const changeValue = (delta) => {
        setValues({ ...values, ...delta })
    }
    const onSubmit = () => {
        if (!values.landlord) {
            if (currentProperty.owner) {
                changeValue({ landlord: currLord })
            }
            else {
                console.log('no property')
            }
        }
        console.log(values)
        addApplication(values);
        
    }
    useEffect(() => {
        getPropertyById(id).then(x => {
            setCurrentProperty(x.data[0]);
            setCurrLord(x.data[0].owner);
            console.log(x.data[0].owner)
            changeValue({ property_id: +id, landlord: x.data[0].owner, tenant: +currentUser.user_id })
        })
    }, [])
    return currentProperty != {} && <>
        <ApplicationForm
            values={values}
            changeValue={changeValue}
            onSubmit={onSubmit}
            currentProperty={currentProperty}
            currLord={currLord}>   
        </ApplicationForm>
    </>
}
export default Application;