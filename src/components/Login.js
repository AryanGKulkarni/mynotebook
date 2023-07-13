import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const [credentials, setCredentials] = useState({email:"", password:""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYjk5ZDljM2M4NWZlYzhiZWM5YzJhIn0sImlhdCI6MTY4ODk3NTIxMn0.fUxELmBWXhuufGoPbgHOYp0Oybf7LPgIK0yFvxnNK7w"    
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
        });
        const json = await response.json();
        if(json.sucess){
            console.log(json)
            localStorage.setItem('token', json.authtoken)
            navigate("/");
        }
        else{
            alert("Invalid Credentials")
        }

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
