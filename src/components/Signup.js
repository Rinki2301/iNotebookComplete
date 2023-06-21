import React, { useState }  from "react";
import {useNavigate} from 'react-router-dom'
const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email:"" ,password:"",confirmPassword:""})
    let navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
             },
             body:JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password})
        });

        const json = await response.json()
        console.log(json)
        if(json.success===true){
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Account created Successfully ","success");
        }
        else{
            props.showAlert("Invalid details","danger");
            navigate('/signup');
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    <div className="container mt-4">
    <h2>Create an Account on iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Name</label>
          <input
            type="text"
            className="form-control" name="name"
            id="name" onChange={onChange} 
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email" onChange={onChange}
            className="form-control"
            id="exampleInputEmail1" name="email"
            aria-describedby="emailHelp" 
          />
        </div>
        <div className="form-group my-3"> 
          <label htmlFor="password">Password</label>
          <input
            type="password" onChange={onChange}
            className="form-control"
            id="password" name="password" minLength={5} 
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password" onChange={onChange}
            className="form-control"
            id="confirmPassword" name="confirmPassword" 
          />
        </div>
       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};


export default Signup;
