import { useContext } from 'react';

const UserProfile = () => {

    return (

        <form action="/uploadImage" method='post'>
        <input type='file' id='image' name='image'/>
        <input type='submit'/>
        </form>

    )
    

};

export default UserProfile;