import "./Logout.css"
import React from "react";
import { useNavigate } from 'react-router-dom';

const Logout = ({token,setToken,me,setMe}) => {
    
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!token) {
    //       navigate("/");
    //     }
    //   }, []);

return(
    <>
        <form className='logout'>
            <h3 id='title'>Do you want to logout?</h3>
            <button id='logout'
            onClick={(event)=>{
                event.preventDefault();
                if(token){
                const removeToken = localStorage.clear();
                setToken(removeToken);
                }
                navigate('/')
            }}>Confirm logout</button>
        </form>
    </>
)

}

export default Logout;