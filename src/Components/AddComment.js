import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddComment() {

    const [text, setText] = useState('');

    return (
        <div>
            <TextField id="filled-basic" label="Filled" variant="filled" value={text} onChange={(e) => setText(e.target.value)} />
            <Button variant="contained">Contained</Button>
        </div>
    )
}

export default AddComment