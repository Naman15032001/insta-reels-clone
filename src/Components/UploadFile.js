import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { ClassNames } from '@emotion/react';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebase';
import { database } from '../firebase';

export default function UploadFile(props) {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = async (file) => {

        if (file == null) {
            setError("Please select file first");
            setTimeout(() => {
                setError("")
            }, 2000);
            return;
        }

        if (file.size / (1024 * 1024) > 100) {
            setError("Please select file less than 100 Mb");
            setTimeout(() => {
                setError("")
            }, 2000);
            return;
        }

        try {
            let uid = uuidv4();
            setLoading(true);

            const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`)
            }
            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError("")
                }, 2000);
                setLoading(false);
                return
            }
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);
                    let obj = {
                        likes: [],
                        comments: [],
                        pId: uid,
                        pUrl: url,
                        uName: props.user.fullName,
                        uProfile: props.user.profilePic,
                        userId: props.user.userId,
                        createdAt: database.getTimeStamp()
                    }
                    database.posts.add(obj).then(async (ref) => {
                        let res = await database.users.doc(props.user.userId).update({
                            postIds: props.user.postIds != null ? [...props.user.postIds, ref.id] : [ref.id]
                        });
                    }).then(() => {
                        setLoading(false);
                    }).catch((err) => {
                        setError(err);
                        setTimeout(() => {
                            setError("")
                        }, 2000);
                        setLoading(false);
                        //return;
                    })
                })

            }
        } catch (err) {

        }
        
    }
    return (
        <div>
            {
                error != '' ? <Alert severity="error">{error}</Alert> :
                    <>
                        <input type="file" accept='video/*' id="upload-input" style={{ display: 'none' }} onChange={(e) => handleChange(e.target.files[0])} />
                        <label htmlFor="upload-input">
                            <Button variant='outlined' color="secondary" disabled={loading} component='span'>
                                <MovieFilterOutlinedIcon />&nbsp;  Upload Video
                            </Button>
                        </label>
                        {loading && <LinearProgress color="secondary" style={{ marginTop: '3%' }} />}
                    </>
            }
        </div>
    )
}
