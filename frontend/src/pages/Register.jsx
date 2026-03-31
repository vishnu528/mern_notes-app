import {useState} from  "react" ;

function register () {
    
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleRegister = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
            const data = await res.json();

        if (!res.ok ) {
            alert(data.message);
            return;
            
        }
        alert("User registered successfully");
    } catch (err) {
        console.error(err);
        alert("Error registering user");
    }
};

return(
    <div>
        <h2>Register</h2>
        <input placeholder="name" onChange={e => setName(e.target.value)} />   
        <input placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input placeholder="password" onChange={e => setPassword(e.target.value)} />

        <button onClick={handleRegister}>Register</button>

    </div>
)


}

export default register;

