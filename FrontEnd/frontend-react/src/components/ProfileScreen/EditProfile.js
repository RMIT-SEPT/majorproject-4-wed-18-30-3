import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import { connect } from 'react-redux'
import Header from '../Layout/Header';


const DNS_URI = "http://localhost:8080"
const axiosConfig = {headers: {'Content-Type': 'application/json'}}
function refresh() {window.location.reload(false)}

async function getUser(userName) {
    return await axios.get(DNS_URI + '/'+ userName ).then(response => {
        return response.data;
    })
}

async function editProfile(newProfile) {

    // console.log(newProfile)
    return await axios.put(DNS_URI + '/api/user', {
        id: newProfile.userId,
        userName: newProfile.userName,
        password: newProfile.password,
        address: newProfile.address,
        phone: newProfile.phone,
        userType: newProfile.userType
    }, axiosConfig)
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
            id: 4,
            userName: null,
            password: null,
            address: null,
            phone: null,
            userType: "CUSTOMER",
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
            userId: this.state.userId,
            userName: this.state.userName,
            password: this.state.password,
            address: this.state.address,
            phone: this.state.phone,
            userType: this.state.userType
        }

        const success = await editProfile(newProfile);
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
                                <input type="submit" value="Save" className="btn btn-sm btn-dark" id="navButton"
                                        />
                            </div>
                            <div className="col-sm">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={refresh}
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