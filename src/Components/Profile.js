import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { database } from '../firebase';

function Profile() {

    const { id } = useParams();

    const [userData, setuserData] = useState(null);
    useEffect(() => {
       database.users.doc(id).onSnapshot((snap)=>{
        setuserData
       })
    }, [])
    return (
        <div>Hello {id}</div>
    )
}

export default Profile