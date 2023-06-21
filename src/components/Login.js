import React, { useState }  from "react";
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"" ,password:""})
    let navigate = useNavigate();
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
             },
             body:JSON.stringify({email:credentials.email, password:credentials.password})
        });
        
        const json = await response.json()
        console.log(json)
        if(json.success===true){
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("LoggedIn Successfully ","success");
        }
        else{
          props.showAlert("Invalid Credentials","danger");
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 ">
        <h2>Login to iNotebook</h2>
          <label htmlFor="email" className="form-label mt-3">Email address</label>
          <input
            type="email"
            className="form-control" onChange={onChange}
            id="email" name="email" value={credentials.email}
            aria-describedby="emailHelp" 
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password" onChange={onChange}
            className="form-control" value={credentials.password}
            id="password" name="password" 
          />
        </div>
         
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
