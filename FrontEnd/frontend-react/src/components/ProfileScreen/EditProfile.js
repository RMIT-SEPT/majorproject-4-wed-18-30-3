import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import { connect } from 'react-redux'

const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"

async function editProfile(newProfile, token, userType, userName) {
    
    const query = {
        userName: newProfile.userName,
        password: newProfile.password,
        address: newProfile.address,
        phone: newProfile.phone,
        userType: newProfile.userType
    }

    console.log(JSON.stringify(query))

    return await axios.put(DNS_URI + '/api/user', {
        userName: newProfile.userName,
        password: newProfile.password,
        address: newProfile.address,
        phone: newProfile.phone,
        userType: newProfile.userType
    }, { headers: { 
        'Authorization': token }
    })
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res.data)
        return [true, res.status]
    })
    .catch(error => {
        console.log(error.message)
        return [false, error.response.status]
    })
}

class EditProfile extends Component {

    constructor(props){
        super();

        this.state = {
            userName: null,
            password: null,
            address: null,
            phone: null,
            response: null,
            errorMessage: "",
            successMessage: "",
        }
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmit(e){
        e.preventDefault();

        if (this.state.userName == null) {
            alert("Please enter your new username.")
            return
        } 
        if (this.state.password == null) {
            alert("Please enter your new password.")
            return
        }
        if (this.state.address == null) {
            alert("Please enter your new address.")
            return
        }
        if (this.state.phone == null) {
            alert("Please enter your new phone number.")
            return
        } 
  
        const newProfile = {
            userName: this.state.userName,
            password: this.state.password,
            address: this.state.address,
            phone: this.state.phone,
            userType: this.props.userType
        }

        const success = await editProfile(newProfile, this.props.token, this.props.userType, this.props.userName);
        this.setState({response: success[1]})

        if (this.state.response >= 200 && this.state.response <= 302) {
            this.setState({successMessage: "User successfully modified."})
            this.setState({errorMessage: ""})
        } else {
            this.setState({errorMessage: "User edit failed, please check your details and try again."})
            this.setState({successMessage: ""})
        }
    }

    render() {
        

        // Check user is logged in
        if (this.props.userName === undefined && this.props.userType === undefined) {
            return (
                <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                    <br/>
                    <b>Please log in to edit your profile.</b>
                    <br/><br/>
                </div>
            )
        
        } else {
            return (
                <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                
                
                <b>Edit Personal Profile</b>
                <p>Ensure password field matches your current password or request will fail.</p>
                
                <b><font color="red">{this.state.errorMessage}</font></b>
                <b><font color="green">{this.state.successMessage}</font></b>
                <br/>
        

                <form onSubmit = {this.onSubmit}>
                <div className="form-group">
                    
                </div>
                
                <div>
                <input type="text" className="form-control" 
                        placeholder="Name" 
                        name="userName" 
                        value={this.state.value} 
                        onChange = {this.onChange}/>
                

                </div>
                <br></br>
                <div>
                <input type="text" className="form-control"
                        placeholder="Password" 
                        name="password"
                        value={this.state.value}
                        onChange = {this.onChange}/>

                </div>
                <br></br>
                <div>
                <input type="text" className="form-control" 
                        placeholder="Address" 
                        name="address" 
                        value={this.state.value} 
                        onChange = {this.onChange}/>

                </div>
                <br></br>
                <div>
                <input type="phone"
                        className="form-control" 
                        placeholder="Phone"     
                        name="phone" 
                        value={this.state.value} 
                        onChange = {this.onChange}/>

                </div>
                <br></br>
                
                <div className="row">
                                <div className="col-sm">
                                    <input type="submit" value="Save" className="btn btn-outline-dark" id="navButton"
                                            />
                                </div>
                                <div className="col-sm">
                                <button className="btn btn-outline-dark" id="navButton" onClick={this.reset}
                                        >
                                    Cancel Edit
                                </button>   
                                </div>
                            </div>
                </form>

                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile)