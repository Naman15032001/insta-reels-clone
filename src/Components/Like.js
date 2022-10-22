import React, { useEffect, useState } from 'react'

function Like({ userData, postData }) {
    const [like, setLike] = useState(null);

    useEffect(() => {

    }, [postData])
    return (
        <div>Like</div>
    )
}

export default Like