import React,{useState} from 'react'
import Base from '../core/Base'
import {Link, Redirect} from "react-router-dom"
import { signin, isAuthenticated, authenticate } from '../auth/helper'

const Signin = ()=> {

    const [values, setValues] =useState({
        name:"",
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    })
    const {name, email, password, error, success, loading, didRedirect} = values;

    const handleChange = name => event => {
        setValues({...values,error: false, [name]: event.target.value})
    }

    const onSubmit =(event)=>{
     event.preventDefault();
     setValues({...values, error:false, loading: true});

     signin({email, password})
     .then(data =>{
         console.log("DATA", data);
         if(data.token){
             let sessionToken = data.token;
             authenticate(data,()=>{
                 console.log("token added")
                 setValues({
                     ...values, didRedirect: true
                 })
             });
         }    
         else{
             setValues({
                 ...values, loading: false
             })
         }
     }).catch((error) => console.log(error));
    };

    const performRedirect =() => {
        if(isAuthenticated()    ){
          return <Redirect to="/"/>
        }
    };

    const loadingMessage =() =>{
        return (
            loading && (
                <div className="alert alert-info">
                <h2> loading....</h2>
                </div>
            )
        )
    }

    const successMessage =() => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert-success" style={{display: success ? "" : "none" }}>
                        New Account created successfully.
                        <Link to="/signin"> login now</Link>
                    </div>
                </div>
            </div>
        )
    } 
    const errorMessage =() => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{display: success ? "none" : "" }}>
                        something went wrong
                    </div>
                </div>
            </div>
        )
    } 


    const signInForm=()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                      <div className="form-group">
                          <label className="text-light">
                              Email
                          </label>
                          <input type="text"
                          className="form-control"
                          values={email}
                          onChange={handleChange("email")}/>
                      </div>
                      <div className="form-group">
                          <label className="text-light">
                              password
                          </label>
                          <input type="password"
                          className="form-control"
                          values={password}
                          onChange={handleChange("password")}/>
                      </div>
                      <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>

                </div>
            </div>    
        )
    }


    return (
        <Base title="Welcome to the signin page">
          {loadingMessage()}
          {signInForm()}
          <p>
             {JSON.stringify(values)}
          </p>
          {performRedirect()}
            
        </Base>
          
    )
}

export default Signin