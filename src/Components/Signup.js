import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './SignUp.css'
import insta from '../Assets/Instagram.JPG';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

export default function Login() {

    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        }
    });

    const classes = useStyles();
    return (
        <div className='singupWrapper'>
            <div className="signupCard">
                <Card variant='outlined'>
                    <div className="insta-logo">
                        <img src={insta} />
                    </div>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Sign up to see photos and videos from your friends.
                        </Typography>
                        {true && <Alert severity="error">This is an error alert — check it out!</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense"/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" />
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" />
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}