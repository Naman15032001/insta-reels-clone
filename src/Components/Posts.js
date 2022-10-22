import React, { useEffect } from 'react'
import { useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import Avatar from '@mui/material/Avatar';
import './Posts.css'
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Like2 from './Like2';

function Posts({ userData }) {

    const [posts, setPosts] = useState(null);

    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnap) => {
            parr = [];
            querySnap.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id };
                parr.push(data);
            })
            setPosts(parr);
        })
        return unsub
    }, [])
    return (
        <div>
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <div className='video-container'>
                        {
                            posts.map((post, index) => (

                                <React.Fragment key={index}>
                                    <div className="videos">
                                        <Video src={post.pUrl}></Video>
                                        <div className="fa" style={{ display: 'flex' }}>
                                            <Avatar src={userData.profilePic} />
                                            <h4>{userData.fullName}</h4>
                                        </div>
                                        <Like userData={userData} postData={post} />
                                        <ChatBubbleIcon className="chat-styling" onClick={() => handleClickOpen(post.pId)} />
                                        <Dialog
                                            open={open == post.pId}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                            maxWidth='md'
                                        >
                                            <div className="modal-container">
                                                <div className="video-modal">
                                                    <video autoPlay={true} muted="muted" controls>
                                                        <source src={post.pUrl} />
                                                    </video>
                                                </div>
                                                <div className="comment-modal">
                                                    <Card sx={{ maxWidth: 345 }}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                                component="img"
                                                                height="140"
                                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                                alt="green iguana"
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    Lizard
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                                    species, ranging across all continents except Antarctica
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button size="small" color="primary">
                                                                Share
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                    <Card variant='outlined'>
                                                        <Typography >
                                                            {post.likes.length == 0 ? '' : `Liked By ${post.likes.length} users`}
                                                            <div style={{ display: 'flex' }}>
                                                                <Like2 postData={post} userData={userData} />
                                                            </div>
                                                        </Typography>
                                                    </Card>
                                                </div>
                                            </div>

                                        </Dialog>
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Posts