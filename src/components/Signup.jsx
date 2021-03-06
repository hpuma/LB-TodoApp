import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import InputDisplay from './elements/AuthInputDisplay';
import '../styles/Auth.css';
import { postSignup } from '../utils/api';
import { isFormComplete } from '../utils/helper';

function Signup(props) {
    //vars
    const history = useHistory();

    //states
    const [errorMessage, setErrorMessage] = useState("");
    const [input, setInput] = useState({name: "", username: "", email: "", password: ""});

    //util function
    function onChangeInput(event) {
        setInput({...input, [event.target.name]: event.target.value});
    }

    //submit signup form
    const handleSubmit = (event) => {
        event.preventDefault();
        postSignup(input)
        .then((response) => {
            alert(response.data.message);
            history.push('/login');
        })
        .catch((error) => {
            setInput({name: "", username: "", email: "", password: ""});
            (error.response)
            ? setErrorMessage(error.response.data.message)
            : setErrorMessage(error.toString())
        });
    }

    return (
        <form id="signup-form" onSubmit={handleSubmit} className="container">
            <div className="form-container">
                <h1>Sign up</h1>
                {/* display any error msgs */}
                { (!isFormComplete(input) && !errorMessage) &&
                    <div className="error-msg">Please fill in all fields</div> }
                { (errorMessage) && <div className="error-msg">{errorMessage}</div> }     
                
                <InputDisplay id="signup-name" name="name" value={input.name} label="Name:" placeholder="Enter Name" onChangeInput={onChangeInput} />
                <InputDisplay id="signup-username" name="username" value={input.username} label="Username:" placeholder="Enter Username" onChangeInput={onChangeInput} />
                <InputDisplay id="signup-email" name="email" value={input.email} label="Email:" placeholder="Enter Email" type="email" onChangeInput={onChangeInput} />
                <InputDisplay id="signup-password" name="password" value={input.password} label="Password:" placeholder="Enter Password" type="password" onChangeInput={onChangeInput} />

                <button id="btn-signup" className="submit-btn" type="submit" disabled={!isFormComplete(input)}>Sign up</button>
            </div>
        </form>
    );
}

export default Signup;