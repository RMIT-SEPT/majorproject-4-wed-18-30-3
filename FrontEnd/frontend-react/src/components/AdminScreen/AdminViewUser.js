import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../Layout/Header';
import makeAnimated from 'react-select/animated';
import axios from "axios";

const DNS_URI = "http://localhost:8080"
const axiosConfig = {headers: {'Content-Type': 'application/json'}}
async function getUser(userName) {
    return await axios.post(DNS_URI + '/api/Customer', {
        userName: userName
    }, axiosConfig)
        .then(res => {
            return [true, res]
        })
        .catch(error => {
            console.error(error)
            return [false, error]
        });
}
const capitalise = (string) => {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
}
async function getBookings() {
    return await axios.get(DNS_URI + '/api/Customer', {
        userName: this.state.userName
    }).then(response => {
        return response.data
    })
}
async function getBookingDetails() {
    const bks = await getBookings().then()

    for (let i = 0; i < bks.length; i++) {
        this.state.bookingList.push({
            value: {id: bks[i]["user"]["userName"], userName: bks[i]["user"]["userName"]},
            label: capitalise(bks[i]["user"]["userName"])})
    }
}

class AdminViewUser extends Component {
    //usertype in state at the moment only if i require to check if its an admin or not
    constructor(props) {
        super(props)
        this.state = {
            userName: null,
            userType: null,
            hasSuccess: false,
            bookingList:"Booking 1",
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    async onUserChange(userName) {
        const success = await getUser(userName).then()
        if (success[1]) {
            this.setState({userName: userName})
            this.setState({userType: "CUSTOMER"})
            this.setState({disableUser: true})
        }
        else{
            if(success[0]){
                alert("Invalid customer, please try again")
            }
        }
    }
    async viewAppointment(booking){
        // alert(booking.toString());
    }
    async onSubmit(e) {
        e.preventDefault()
        //you enter a username, if its valid it locks it in otherwise it throws an error.
        //gets bookings for username, and displays the upcoming bookings,
        // admin selects one and submits, after submission it shows details of the appointment.
        const forNow = true;
        if (forNow) {
            //this.props.userName != null && this.props.userType != null
            // Validate user type
            if (!forNow) {
                //this.props.userType != "ADMIN"
                alert("You must be an Admin to look at a customers bookings please try again!.")
                return
            }
            else{
                //const success = await getBookingDetails();
                if(forNow){
                        document.getElementById('Bookings').innerHTML += "1";
                    this.setState({hasSuccess: true});
                }
            }
        }
        else{
            alert("you must login!")
            return
        }

    }
    render() {
        const animatedComponents = makeAnimated();
        if(this.state.hasSuccess){
            return(
                <div className = "AdminViewUser">
                    <Header/>
                    <br/><br/><br/><br/>
                    <div className = "Heading">
                        <h1>Search for appointment</h1>
                        <p>Enter a username of a customer and click submit to view all their bookings!</p>
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
                                           onChange={this.onChange}>
                                    </input>

                                </div>
                            </div>
                            <div className="col-sm"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                {bookingDisplay}
                            </div>
                            <div className="col-sm"></div>
                        </div>
                    </form>
                </div>
            )
        }
        else{
            // show appointments with buttons
            return(
                <div className = "adminViewUser">
                    <h1>Bookings:</h1>
                    <form><div className="col-sm">
                        <input type="submit" className="btn btn-sm btn-dark" placeholder="Search" id="navButton"/>
                    </div></form>
                    <p id={"Bookings"}>
                    </p>
                </div>
                )
        }
    }
}
export default AdminViewUser;
