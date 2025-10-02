import React from 'react'

export default function ImageList({ imageList }) {
    return (
        <ul>
            {imageList.map((img) => {
                return <li key={img.id} ><img style={{ width: 300 }} src={img.download_url} alt="" /></li>
            })}
        </ul>
    )
}
