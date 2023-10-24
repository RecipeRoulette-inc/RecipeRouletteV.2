import React, {useState, setState, useEffect } from "react";


export default function ProfilePage() {

  const [userInfo, setUserInfo] = useState({username: '', image: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInfo()
  }, []);

  function getInfo() {
    
    fetch('/profile/userInfo')
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      setUserInfo({username: res.username, image: 'example.jpg'})
    })
    .then(() => setLoading(false))

  }


  if (loading) {
    return <div>loading ...</div>
  } else {

  return (
    <div> 
      <img src={userInfo.image}></img>
      <p>Hello, {userInfo.username}</p>

      {/* <img src={userPhoto}></img>
      <button onClick={uploadPhoto}>add photo</button>
      <text>{username}</text>
      <br></br>
      <h3>Saved Recipes</h3>
      <br></br>
      <h3>Dietary Restrictions</h3>
      <br></br>
      <h3>Uploaded Recipes</h3> */}

    </div>
  )
}
}