import React , {useState} from 'react'
import Base from '../core/Base'
import {Link} from "react-router-dom"
import {signup} from "../auth/helper/index"
const  Signup=() =>{
    
    const [values, setValues]=  useState({
        name: "",
        email:"",
        password:"",
        error: "",
        success: false,
    });
    const {name, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values,error: false, [name]: event.target.value})
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        setValues({...values, error: false})
        signup({name,email,password})
        .then((data)=> {
            console.log("DATA",data);
            if(data.email == email){
                setValues({
                    ...values,
                    name:"",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                })
            }
            else{
                setValues({
                    ...values,
                    error: true,
                    success: false
                })
            }
        }
        )
        .catch(err => console.log(err))


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

    const signUpForm=()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                      <div className="form-group">
                          <label className="text-light">
                              Name
                          </label>
                          <input type="text"
                          className="form-control"
                          values={name}
                          onChange={handleChange("name")}/>
                      </div>
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
        <Base title =" signup page" description =" A signup for lco users">
            {errorMessage()}
            {successMessage()}
            {signUpForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
            
        </Base>
    )
}

export default Signup