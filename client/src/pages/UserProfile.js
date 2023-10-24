
import React, { useContext, useEffect, useState } from "react";

const UserProfile = () => {

    const [imageURL, setImageURL] = useState('')

    function getImage() {
        
        fetch('/image/displayImage')
          .then((res) => {
            return res.json();
          })
          .then((data) => setImageURL(data.url))
          .then(() => console.log(imageURL))

    }

    function showURL() {
        console.log(typeof(imageURL));
    }


    return (
        <div>
        <form action="/image/uploadImage" method='post' enctype="multipart/form-data">
        <input type='file' id='image' name='image'/>
        <input type='submit'/>
        </form>
        <br></br>
        <button onClick={getImage}>Get URL</button>
        <br></br>
        <br></br>
        <br></br>
        <img src={imageURL} />



        </div>

    )
    

};

export default UserProfile;