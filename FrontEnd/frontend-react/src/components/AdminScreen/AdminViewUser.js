import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const DNS_URI = "http://localhost:8080"
const axiosConfig = {headers: {'Content-Type': 'application/json'}}
async function getUser(userName) {
    return await axios.post(DNS_URI + '/api/user', {
        userName: userName
    }, axiosConfig)
        .then(res => {
            return [true, res]
        })
        .catch(error => {
            console.error(error)
            return [false, error]
        })
}
class AdminViewUser extends Component {
    //usertype in state at the moment only if i require to check if its an admin or not
    constructor() {
        super();
        this.state = {
            userName: "",
            userType: null,
            disableUser: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    async onUserChange(service) {
        const success = await getUser(service).then()
        if (success[1]) {
            // Populate timeslots accoring to worker service availablility
            this.setState({userName: service})
            this.setState({disableUser: true})
        }
        else{
            if(success[0]){
                alert("Invalid user, please try again")
            }
        }
    }
    async onSubmit(e) {
        //you enter a username, if its valid it locks it in otherwise it throws an error.
        //gets bookings for username, and displays the upcoming bookings,
        // admin selects one and submits, after submission it shows details of the appointment.
    }
    render() {
        const animatedComponents = makeAnimated();
        return(
            <div className = "AdminViewUser">
                <Header/>
                <br/><br/><br/><br/>
                <div className = "Heading">
                    <h1>Search for appointment</h1>
                    <p>Enter a username and select an appointment to see the details.</p>
                    <br/><br/>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-sm"></div>
                        <div className="col-sm">
                            <div className = "form-group">

                                <input type="text" className="form-control"
                                       placeholder="Username"
                                       id="userName"
                                       name={"userName"}
                                       value={this.state.value}
                                       onChange={this.onUserChange}>
                                </input>

                            </div>
                        </div>
                        <div className="col-sm"></div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="bookings">Select a worker:</label>
                        <Select name={"bookings"} value={this.state.value} options={this.state.}
                                onChange={this.} components={animatedComponents}/>
                    </div>
                    <div className="row">
                        <div className="col-sm"></div>
                            <div className="col-sm">
                                <input type="submit" className="btn btn-sm btn-dark" placeholder="Search" id="navButton"/>
                            </div>
                        <div className="col-sm"></div>
                    </div>
                </form>
            </div>
        )
    }
}