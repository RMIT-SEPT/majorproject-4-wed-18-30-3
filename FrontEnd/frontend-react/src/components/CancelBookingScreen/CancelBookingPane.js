import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import axios from "axios";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import CancelButton from './CancelButton';

const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"
// const axiosConfig = {headers: {'Content-Type': 'application/json'}}

// Return all availability objects
async function getBookings(token, userType, userName) {

    if (userType === "ADMIN") {
        return await axios.get(DNS_URI + '/api/booking', {
            headers: {
                'Authorization': token
            }
        }).then(function (response) {
            console.log('Authenticated');
            return response.data
        }).catch(function (error) {
            console.error("getBookings()", error)
            console.log(error.response.data)
        });
    } else if (userType === "CUSTOMER") {
        return await axios.get(DNS_URI + '/api/customer/' + userName, {
            headers: {
                'Authorization': token
            }
        }).then(function (response) {
            return response.data.bookings
        }).catch(function (error) {
            console.log(error.response)
            console.log(error.response.data)
        });
    }
}



//  --------delete axios method here -------
async function deleteB(reasonInfo, bkgInfo, token, userType, userName) {

    // ------use this correct api/booking/delete for post log reason ------
     return await axios.delete(DNS_URI + '/api/booking', {
        timeslot: {date: bkgInfo.date },
        worker: {user: {userName: bkgInfo.userName}}
    },  { headers: { 
        'Authorization': token }
    })
    .then(res => {
        return [true, res.status, res.data, res]
    })
    .catch(error => {
        return [false, error.response.status, error.response.data, error]
    })
}


async function logReason(reasonInfo, token) {


//  ------use this correct api/booking/delete for post log reason and backend will delete bookings in database ------

    return await axios.post(DNS_URI + '/api/booking/delete', {

        bookingReference: reasonInfo.bookingReference,
        reason: reasonInfo.reason
    }, {
        headers: {
            'Authorization': token
        }
    })
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            return [true, res.status]
        })
        .catch(error => {
            console.log(error.message)
            return [false, error.response.status]
        })
}


// async function deleteBooking2() {

//     console.log(id)
//     return await axios.put(DNS_URI + '/api/booking'+id)
//     .then(res => {
//         console.log(`statusCode: ${res.status}`)
//         console.log(res.data)
//         return [true, res.status]
//     })
//     .catch(error => {
//         console.log(error.message)
//         return [false, error.response.status]
//     })
// }


const capitalise = (string) => {
    if (typeof string !== 'string') return null
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// Create date object from "YYYY-MM-DD-hh-mm-ss" string
function parseDateString(dStr) {
    var date = new Date()
    date.setUTCFullYear(dStr.slice(0, 4))
    date.setUTCMonth(parseInt((dStr.slice(5, 7)) - 1, 10))
    date.setUTCDate(dStr.slice(8, 10))
    date.setUTCHours(dStr.slice(11, 13))
    date.setUTCMinutes(dStr.slice(14, 16))
    date.setUTCSeconds(dStr.slice(17, 19))
    return date
}

class CancelBookingPane extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookingReference: "",
            userName: null,
            userType: null,
            bookings: this.getUserBookings(),
            bookingMsg: null,
            reason: "",
            success: null

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.reset = this.reset.bind(this)

    }

    reset() {
        this.setState({bookingReference: "",})
        this.setState({reason: ""})
        this.setState({displayMessage: null})
        this.setState({bookings: this.getUserBookings()})
        this.setState({success: null})
    }

    async getUserBookings() {
        // Only load bookings if a customer is logged in 
        if (this.props.userType !== null && this.props.userType !== "ADMIN" && this.props.userType !== undefined) {

            const bkgs = await getBookings(this.props.token, this.props.userType, this.props.userName).then()
            var userBkgs = []

            console.log(bkgs)
            var msgString = "Booking History Is Empty!!!"

            if (bkgs !== undefined) {
                // Only add bookings if theyre in the future
                if (Array.isArray(bkgs)) {
                    for (let i = 0; i < bkgs.length; i++) {
                        if (parseDateString(bkgs[i]["timeslot"]["date"]) > new Date()) {
                            userBkgs.push(bkgs[i])
                        }
                    }
                } else if (bkgs.constructor === Object) {
                    if (parseDateString(bkgs["timeslot"]["date"]) > new Date()) {
                        userBkgs = bkgs
                    }
                }
                if (userBkgs.length > 1)
                    msgString = "You have " + userBkgs.length + " active bookings."
                else if (userBkgs.length === 1)
                    msgString = "You have " + userBkgs.length + " active booking."

                this.setState({ bookingMsg: msgString })
                this.setState({ bookings: userBkgs })
            }
        }
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    // submit booking id and  cancel reason   only send bookingReference and reason is enough

    async onSubmit(e) {
        e.preventDefault();
               
        
        // Validate input
        if (this.state.bookingReference === "") {
            alert("Please enter a valid booking ID")
            return
        }
        if (this.state.reason === "") {
            alert("Please enter a valid booking ID")
            return
        }


        const reasonInfo = {
            bookingReference: this.state.bookingReference,
            reason: this.state.reason
        }

        const bkgInfo = {
            date: [this.state.bookings.date],
            worker: { userName: [this.state.bookings.userName] }
        }

        const result = await logReason(reasonInfo, this.props.token);
        console.log(result)
        if(result[0] === true ){
            this.setState({success: true})
        } else {
            this.setState({success: false})
        }
        
    }

    async deleteBooking(e) {
        e.preventDefault();
       
        const reasonInfo = {
            bookingReference: this.state.bookingReference,
            reason: this.state.reason
        }

        const bkgInfo = {
            date: [this.state.bookings.date],
            worker: { userName: [this.state.bookings.userName] }
        }

        deleteB(bkgInfo, this.props.token);
        console.log(bkgInfo,this.props.token)
    }

   //just test post and see what will be send (bookingReference and reason)
    onSubmit1 = (e) =>{
        e.preventDefault();

        const reasonInfo = {
            bookingReference: this.state.bookingReference,
            reason: this.state.reason
        }

        // Validate input
        if (this.state.bookingReference === "") {
            alert("Please enter a valid booking ID")
            return
        }
        if (this.state.reason === "") {
            alert("Please enter a valid booking ID")
            return
        }

        logReason(reasonInfo, this.props.token);
        console.log(reasonInfo,this.props.token)

    }

    render() {

        var headerText = "AGME Booking App"
        if (this.props.userType === "CUSTOMER")
            headerText = "AGME Booking App - Customer portal"
        else if (this.props.userType === "WORKER")
            headerText = "AGME Booking App - Worker portal"
        else if (this.props.userType === "ADMIN")
            headerText = "AGME Booking App - Admin portal"

        // Check user is logged in
        if (this.props.userName === undefined && this.props.userType === undefined) {
            return (
                <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                    <Header
                        userName={this.props.userName}
                        userType={this.props.userType}
                        token={this.props.token} />
                    <br /><br /><br /><br />
                    <b>Please log in first.</b>
                    <br /><br />
                    <Footer />
                </div>
            )

        } else if (this.state.success === null) {

            const bookings = this.state.bookings
            var bookingDisplay

            // Wait for promise fulfillment
            if (Array.isArray(bookings)) {

                // Customer
                var count = 0
                if (this.props.userType === "CUSTOMER") {
                    bookingDisplay = bookings.map((bkg) => {
                        return (
                            <div key={count++}>
                                <br />

                                <div className="list-group-item d-flex justify-content-between align-items-center" >

                                    <table width="2000%" border="2">
                                        <thead>
                                            <tr>
                                                <th>Booking ID </th>
                                                <th>ServiceName</th>
                                                <th>WorkerName</th>
                                                <th>Duration</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{bkg["id"]}</td>
                                                <td>{capitalise(bkg["service"]["name"])}</td>
                                                <td>{bkg["worker"]["user"]["userName"]}</td>
                                                <td>{bkg["service"]["minDuration"]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    })
                }
            }

            // Check user is logged in
            if (this.props.userName === undefined && this.props.userType === undefined) {
                return (
                    <div className="cancel_pane" id="cancel_pane">
                        <br />
                        <b>Please log in to view availabilites</b>
                        <br /><br />
                    </div>
                )
            }
            // design for successful cancel page
            // if (!this.state.hasSuccess && !this.state.hasFail) { 

            //    post booking id & reason to api/delete
            return (
                <div className="container" id="cancelbooking_container">

                    <br />
                    <div className="row">
                        <div className="col-sm-9">

                            <b>{this.props.userName} | Bookings</b> &nbsp; {this.state.bookingMsg}
                            <br /> <br />

                            <div className="cancelpane">

                                <form onSubmit={this.onSubmit}>
                                    <p>Please enter the ID of the reservation you need to cancel and provide a reason.</p>
                                    <div>
                                        <input type="text" className="form-control"
                                            placeholder="booking ID"
                                            name="bookingReference"
                                            value={this.state.value}
                                            onChange={this.onChange} />

                                    </div>
                                    <br></br>
                                    <div>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Cancel Reason"
                                            name="reason"
                                            value={this.state.value}
                                            onChange={this.onChange} />

                                    </div>
                                    <br></br>

                                    <div className="row">
                                        <div className="col-sm">
                                            <input type="submit" value="Cancel booking" className="btn btn-outline-dark" id="navButton"/>
                                        </div>
                                            <br/>
                                            
                                    </div>
                                </form>
                            </div>
                            <div className="history-part-col">
                                
                                <div className="list-group list-group-flush" id="scrollable">
                                    {bookingDisplay}
                                    {/* <button oonClick={this.deleteBooking}>  cancel  </button> */}
                                </div>
                            </div>



                        </div>
                    </div>

                </div>
            )        

        // Successful cancel
        } else if (this.state.success === true) {
            return (
                <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                    <br/>    
                    <b>Booking cancelled successfully. Thanks, {this.props.userName}.</b>
                    <br/><br/>   

                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-outline-dark" id="navButton" onClick={this.reset}>
                                Cancel another another booking
                            </button> 
                        </div>
                        <div className="col-sm">
                            <CancelButton/>
                        </div>
                    </div>
                </div>   
            )

        // Failed cancel
        } else if (this.state.success === false) {
            return (
                <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                    <br/>    
                    <b>Cancellation failed. Please try again.</b>
                    <br/><br/>   
                
                <div className="row">
                    <div className="col-sm">
                        <button className="btn btn-outline-dark" id="navButton" onClick={this.reset}>
                            Cancel another another booking
                        </button> 
                    </div>
                    <div className="col-sm">
                        <CancelButton/>
                    </div>
                </div>
            </div>  
            )
        }
    }
}
   


export default CancelBookingPane
