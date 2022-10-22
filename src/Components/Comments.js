import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

function Comments({ postData }) {

    const [comments, setComments] = useState(null);

    useEffect(() => {
        myFunction();
    }, [postData]);

    const myFunction = async () => {
        let arr = [];

       // console.log("ok", postData.comments.length)
        //console.log("ok", postData)

        for (let i = 0; i < postData.comments.length; i++) {

            let data = await database.comments.doc(postData.comments[i]).get();

           // console.log("ok", data.data());

            arr.push(data.data());
        }

        setComments(arr);

        //console.log(comments, "naman");
    };


    return (
        <div>
            {
                comments == null ? <CircularProgress /> :
                    <>
                        {
                            comments.map((comment, index) => (
                                <div style={{ display: 'flex' }}>
                                    <Avatar src={comment.uProfileImage} />
                                    <p>&nbsp;&nbsp;<span style={{ fontWeight: 'bold' }}>{comment.uName}</span>&nbsp;&nbsp;{comment.text}</p>
                                </div>
                            ))
                        }
                    </>
            }
        </div>
    )
}

export default Comments