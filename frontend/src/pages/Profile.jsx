 import {useEffect, useState} from "react";
 function Profile(){
    const [user,setUser] = useState("")
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`,{
            headers:{
                authorization:"Bearer " + token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === "invalid or expired token"){
                localStorage.removeItem("token");
                window.location.href ="/";
            }else{
                console.log(data);
                setUser(data);
            }
        })
    },[]);
    return( 
    <>
    <h1>Profile Page</h1>
        {user &&(
            <>
            <p>Name:{user.name}</p>
            <p>Email:{user.email}</p>
            </>

        )}
    
    </>
    )
 }

 export default Profile;
