import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import { MDBBtn, MDBCollapse } from "mdbreact";
import axios from "axios";

const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"

async function getBookings(token, userType, userName) {

    if (userType === "ADMIN") {
        return await axios.get(DNS_URI + '/api/booking', {
            headers: { 
                'Authorization': token }
        }).then(function(response) {
            console.log('Authenticated');
            return response.data
        }).catch(function(error) {
            console.error("getBookings()", error)
            console.log(error.response.data)
        });
    } 
}

// Return YYYY-MM-DD string from a given date
function printDate(date) {
    var dateString =
        ("0" + date.getDate()).slice(-2) + "/" +
        ("0" + (date.getMonth()+1)).slice(-2) + "/" +
        date.getFullYear()
    return dateString
}

// Create date object from "YYYY-MM-DD-hh-mm-ss" string
function parseDateString(dStr) {
    var date = new Date()
    date.setFullYear(dStr.slice(0, 4))
    date.setMonth(parseInt((dStr.slice(5, 7)) - 1, 10))
    date.setDate(dStr.slice(8, 10))
    date.setHours(dStr.slice(11, 13))
    date.setMinutes(dStr.slice(14, 16))
    date.setSeconds(dStr.slice(17, 19))  
    return date
}

class AdminBookingSummary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapse1: "",
            collapse2: "",
            collapse3: "",
            collapse4: "",
            collapse5: "",
            collapse6: "",
            collapse7: "",
            bookings: this.loadBookings(),
            dayData: {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []}

        }

        this.loadBookings = this.loadBookings.bind(this)
        this.createSummary = this.createSummary.bind(this)
    }

    toggleCollapse1=collapse1=>()=>{this.setState(prevState=>({collapse1: prevState.collapse1!==collapse1?collapse1:""}))}
    toggleCollapse2=collapse2=>()=>{this.setState(prevState=>({collapse2: prevState.collapse2!==collapse2?collapse2:""}))}
    toggleCollapse3=collapse3=>()=>{this.setState(prevState=>({collapse3: prevState.collapse3!==collapse3?collapse3:""}))}
    toggleCollapse4=collapse4=>()=>{this.setState(prevState=>({collapse4: prevState.collapse4!==collapse4?collapse4:""}))}
    toggleCollapse5=collapse5=>()=>{this.setState(prevState=>({collapse5: prevState.collapse5!==collapse5?collapse5:""}))}
    toggleCollapse6=collapse6=>()=>{this.setState(prevState=>({collapse6: prevState.collapse6!==collapse6?collapse6:""}))}
    toggleCollapse7=collapse7=>()=>{this.setState(prevState=>({collapse7: prevState.collapse7!==collapse7?collapse7:""}))}

    async loadBookings() {
        
        if (this.props.userType === "ADMIN") {
            const bkgs = await getBookings(this.props.token, this.props.userType, this.props.userName)           
            if (bkgs !== undefined) {
                var first = new Date()
                var second = new Date()
                var third = new Date()
                var fourth = new Date()
                var fifth = new Date()
                var sixth = new Date()
                var seventh = new Date()
                second.setDate(first.getDate() + 1)
                third.setDate(first.getDate() + 2)
                fourth.setDate(first.getDate() + 3)
                fifth.setDate(first.getDate() + 4)
                sixth.setDate(first.getDate() + 5)
                seventh.setDate(first.getDate() + 6)
                console.log(first.getDate() + " " + second.getDate() + " " + third.getDate() + " " + fourth.getDate() + " " + fifth.getDate() + " " + sixth.getDate() + " " + seventh.getDate())
                this.setState({bookings: bkgs})

                // Partition timeslots into their respective days
                var updatedDayData = this.state.dayData
                for (let i = 0; i < bkgs.length; i++) {
                   
                    // Only list future timeslots
                    var bkgDate = parseDateString(bkgs[i].timeslot.date)                  

                    // if (parseDateString(bkgs[i]["timeslot"]["date"])  > parseDateString(formattedTime) || parseDateString(bkgs[i]["timeslot"]["date"])  > parseDateString(next) || parseDateString(bkgs[i]["timeslot"]["date"])  > parseDateString(nextNext)) {
                        switch(bkgDate.getDate()) {
                            case first.getDate():
                                updatedDayData[0].push(bkgs[i])
                                break
                            case second.getDate():
                                updatedDayData[1].push(bkgs[i])
                                break
                            case third.getDate():
                                updatedDayData[2].push(bkgs[i])
                                break
                            case fourth.getDate():
                                updatedDayData[3].push(bkgs[i])
                                break
                            case fifth.getDate():
                                updatedDayData[4].push(bkgs[i])
                                break
                            case sixth.getDate():
                                updatedDayData[5].push(bkgs[i])
                                break
                            case seventh.getDate():
                                updatedDayData[6].push(bkgs[i])
                                break
                            default:
                                console.log("No bookings found")
                        }
                    // }
                }
                this.setState({dayData: updatedDayData})
                // console.log(this.state.dayData[0])
                // console.log(this.state.dayData[1])
                // console.log(this.state.dayData[2])
                // console.log(this.state.dayData[3])
                // console.log(this.state.dayData[4])
                // console.log(this.state.dayData[5])
                // console.log(this.state.dayData[6])
            }           
        }
    }

    createSummary(dayData) {
        if (dayData !== undefined) {
            
            // Quantify everything
            var avCount = 0
            var bkgCount = 0        
            var servicesOffered = []
            var servicesBooked = []
            var workers = []
            var companies = [] 

            for (let i = 0; i < dayData.length; i++) {
                
                // Null customer means its an availability
                if (dayData[i].customer === null) {
                    avCount++
                } else {
                    bkgCount++
                }

                // Get company names
                if (!companies.includes(dayData[i].worker.companyName)) {
                    companies.push(dayData[i].worker.companyName)
                }

                // Get workers
                if (!workers.includes(dayData[i].worker.user.userName)) {
                    workers.push(dayData[i].worker.user.userName)
                }

                // Get services offered
                for (let j = 0; j < dayData[i].worker.services.length; j++) {
                    if (!servicesOffered.includes(dayData[i].worker.services[j].name)) {
                        servicesOffered.push(dayData[i].worker.services[j].name)
                    }

                    // Get services booked
                    if (dayData[i].service !== null) {
                        if (servicesBooked.includes(dayData[i].service)) {
                            servicesBooked.push(dayData[i].service.name)
                        }
                    }
                }

                

            }
        }
        return (
            <div>
            <p className="text-left">There are a total of {workers.length} workers from {companies.length} companies offering {servicesOffered.length} unique services on this day.</p>
            <p className="text-left">{bkgCount} appointments are booked so far.</p>
            <p className="text-left">There are a total of {avCount} open (non-elapsed) timeslots left to book. </p>
            </div>
        )
        
    }

    render() {

        // Check user is logged in
        if (this.props.userName === undefined && this.props.userType === undefined) {
            return (
                <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                <Header/>
                    <br/><br/><br/><br/>
                <b>Please <a href="/login">log in </a> to use the app.</b>
                <br/><br/>
                <Footer/>
                </div>
            )
        }

        
        var day0
        if (this.state.dayData[0][0] !== undefined) {
            day0 = printDate(parseDateString(this.state.dayData[0][0].timeslot.date))
        }
        
        var day1
        if (this.state.dayData[1][0] !== undefined) {
            day1 = printDate(parseDateString(this.state.dayData[1][0].timeslot.date))
        }

        var day2
        if (this.state.dayData[2][0] !== undefined) {
            day2 = printDate(parseDateString(this.state.dayData[2][0].timeslot.date))
        }

        var day3
        if (this.state.dayData[3][0] !== undefined) {
            day3 = printDate(parseDateString(this.state.dayData[3][0].timeslot.date))
        }

        var day4
        if (this.state.dayData[4][0] !== undefined) {
            day4 = printDate(parseDateString(this.state.dayData[4][0].timeslot.date))
        }

        var day5
        if (this.state.dayData[5][0] !== undefined) {
            day5 = printDate(parseDateString(this.state.dayData[5][0].timeslot.date))
        }

        var day6
        if (this.state.dayData[6][0] !== undefined) {
            day6 = printDate(parseDateString(this.state.dayData[6][0].timeslot.date))
        }

        return (
            <div className="container">
                <Header id={this.props.id}
                    userName={this.props.userName}
                    address={this.props.address}
                    phone={this.props.phone}
                    userType={this.props.userType}
                    token={this.props.token}/>
                <br/><br/><br/>
                
                <h2>7-day worker availability summary</h2>

                <div className="row">
                    <div className="col-sm-3">
                        <NavPane
                            id={this.props.id}
                            userName={this.props.userName}
                            address={this.props.address}
                            phone={this.props.phone}
                            userType={this.props.userType}
                            token={this.props.token}/>
                    </div>
                    <div className="col-sm-9">

                    <br/>
                    <p>Click a date to view its summary.</p>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse1("basicCollapse1")}><b>{day0}</b></MDBBtn></p>
                    <MDBCollapse id="basicCollapse1" isOpen={this.state.collapse1}>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                            {this.createSummary(this.state.dayData[0])}
                            <span className="badge badge-primary badge-pill">today</span>
                        </div>
                    </MDBCollapse>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse2("basicCollapse2")}><b>{day1}</b></MDBBtn></p>
                    <MDBCollapse id="basicCollapse2" isOpen={this.state.collapse2}>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                            {this.createSummary(this.state.dayData[1])}
                            <span className="badge badge-primary badge-pill">tomorrow</span>
                        </div>
                    </MDBCollapse>
                    
                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse3("basicCollapse3")}><b>{day2}</b></MDBBtn></p>
                    <MDBCollapse id="basicCollapse3" isOpen={this.state.collapse3}>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                            {this.createSummary(this.state.dayData[2])}
                        </div>
                    </MDBCollapse>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse4("basicCollapse4")}><b>{day3}</b></MDBBtn></p>
                    <MDBCollapse id="basicCollapse4" isOpen={this.state.collapse4}>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                            {this.createSummary(this.state.dayData[3])}
                        </div>
                    </MDBCollapse>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse5("basicCollapse5")}><b>{day4}</b></MDBBtn></p>
                    <MDBCollapse id="basicCollapse5" isOpen={this.state.collapse5}>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                            {this.createSummary(this.state.dayData[4])}
                        </div>
                    </MDBCollapse>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse6("basicCollapse6")}><b>{day5}</b></MDBBtn></p>
                    <MDBCollapse id="basicCollapse6" isOpen={this.state.collapse6}>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                            {this.createSummary(this.state.dayData[5])}
                        </div>
                    </MDBCollapse>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse7("basicCollapse7")}><b>{day6}</b></MDBBtn></p>
                    <MDBCollapse id="basicCollapse7" isOpen={this.state.collapse7}>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                            {this.createSummary(this.state.dayData[6])}
                        </div>
                    </MDBCollapse>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default AdminBookingSummary;
