import {useState} from "react";

function Login(){
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState ("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const res = await fetch (`${import.meta.env.VITE_API_URL}/api/auth/login`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        const data = await res.json();
        console.log(data);
        if(data.token) {
            localStorage.setItem("token",data.token);
            alert("login successfull");

        }else{
            alert(data.message)
        }

    };
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" placeholder="enter password " value={password} onChange={(e) =>
                setPassword(e.target.value)
            } />
            <button type="submit">Login</button>
            <a href="/register">Create Account</a>
        </form>
    )

}

export default Login;



