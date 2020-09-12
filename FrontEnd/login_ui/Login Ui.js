import React, { Component } from 'react';

class Login_Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userName: null,
        };
    }
    render(){
        return(
            <div className = "Login_Ui">
                <div className = "Heading">
                    <h1 header> Log in</h1>
                    <br></br><br></br><br></br><br></br>
                </div>
                <div className = "UserName">
                <label for="username">Username:</label>
                <input type="text" id="username" name="uname"></input><br></br><br></br>
                </div>
                <div className = "PasswordName">
                <label for="password">Password:</label>
                <input type="text" id="password" name="pass"></input><br></br><br></br>
                </div>
            </div>
        )
    }
}
//document.getElementById("username").value