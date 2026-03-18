import { Link ,useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    return(
        <div>
            <Link to="/profile" >Profile</Link> |  
            <Link to="notes">Notes</Link>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar;