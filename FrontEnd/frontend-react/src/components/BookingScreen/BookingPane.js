import React, { Component } from 'react'
import axios from "axios";
import CancelButton from './CancelButton';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link } from 'react-router-dom';

    // const DNS_URI = "http://localhost:8080"
    const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"

    // Return the current time in backend-friendly format 
    function currentTime() {
        var date = new Date();
        var dateString =
            date.getUTCFullYear() + "-" +
            ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
            ("0" + date.getUTCDate()).slice(-2) + "-" +
            ("0" + date.getUTCHours()).slice(-2) + "-" +
            ("0" + date.getUTCMinutes()).slice(-2) + "-" +
            ("0" + date.getUTCSeconds()).slice(-2);
        return dateString
    }

    const capitalise = (string) => {
        if (typeof string !== 'string') return null
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    // Header config for REST requests
    const axiosConfig = {headers: {'Content-Type': 'application/json'}}

    // Send a create booking request to bookings endpoint
    async function createBooking(newBooking) {

        console.log(newBooking)
        return await axios.post(DNS_URI + '/api/booking', {
            updated_At: currentTime(),
            worker: newBooking.worker,
            timeslot: newBooking.timeslot,
            service: newBooking.service,
            customer: newBooking.customer
        }, axiosConfig)
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
            return true
        })
        .catch(error => {
            console.error(error)
            return false
        })
    }

    // Return an array of all booking objects
    async function getBookings() {
        return await axios.get(DNS_URI + '/api/booking').then(response => {
            return response.data
        })
    }

    // Return an array of all worker objects
    async function getWorkers() {
        return await axios.get(DNS_URI + '/api/worker').then(response => {
            return response.data
        })
    }

    // Extract company list from workers
    async function getCompanies() {
        const wks = await getWorkers().then()
        var companies = []
        for (let i = 0; i < wks.length; i++) {   
            companies.push(wks[i]["companyName"])
        }
        return companies
    }

    // Return options for companies select box
    async function getCompanyOptions() {
        const cps = await getCompanies()
        var companyOptions = []
        for (let i = 0; i < cps.length; i++) {               
            companyOptions.push({
                value: cps[i],
                label: cps[i]})            
        }
        return companyOptions
    }

    // Return worker options depending on company selection
    async function getWorkerOptions(service, company) {
        const wks = await getWorkers().then()
        var workerOptions = []
    
        // Get all workers names who belong to company who offer the service
        for (let i = 0; i < wks.length; i++) {        
            if (wks[i]["companyName"] === company)
                for (let j = 0; j < wks[i]["services"].length; j++) {  
                    if (wks[i]["services"][j]["name"] === service) {
                    workerOptions.push({
                        value: wks[i]["user"]["userName"],
                        label: capitalise(wks[i]["user"]["userName"]) })
                    }
                }
            }
        return workerOptions
    }

    // Get services options provided by the given company
    async function getServiceOptions(companyName) {
        const wks = await getWorkers().then()
        var serviceOptions = []
        for (let i = 0; i < wks.length; i++) {                    
            
            // Get all services offered by workers within the company
            if (wks[i].companyName === companyName) {
                for (let j = 0; j < wks[i]["services"].length; j++) {               
                    serviceOptions.push({
                        value: wks[i]["services"][j].name,
                        label: capitalise(wks[i]["services"][j]["name"])})
                }
            }

        }   
        return serviceOptions
    }

        // Return relevant options depending on selectbox type
        async function getAvailabilityOptions(worker, service) {
            const avs = await getBookings().then()
            var availOptions = []
        
            // Get services offered by selected worker
            for (let i = 0; i < avs.length; i++) {               
                if (avs[i]["customer"] === null && avs[i]["worker"]["user"]["userName"] === worker) {
                    for (let j = 0; j < avs[i]["worker"]["services"].length; j++) {     
                        if (avs[i]["worker"]["services"][j]["name"] === service) {         
                            availOptions.push({
                                value: avs[i]["timeslot"]["date"], 
                                label: avs[i]["timeslot"]["date"] })
                        }
                    }
                }
            }
        return availOptions
    }

class BookingPane extends Component {

    constructor() {
        super()
        this.state = {
            availability: null,
            companyName: null,
            service: null,
            worker: null,
            userName: null,
            userType: null,
            optionsCompany: this.loadCompanies(),
            optionsService: null,
            optionsAvailability: null,
            optionsWorker: null,      
            disableCompany: false,
            disableWorker: true,
            disableService: true,
            disableAvailability: true,
            hasSuccess: false,
            hasFail: false
            
        }

        this.refresh = this.refresh.bind(this);
        this.onAvailabilityChange = this.onAvailabilityChange.bind(this);
        this.onCompanyChange = this.onCompanyChange.bind(this);
        this.onServiceChange = this.onServiceChange.bind(this);
        this.onWorkerChange = this.onWorkerChange.bind(this);
        this.loadWorkers = this.loadWorkers.bind(this);        
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Revert state back to inital
    async refresh () {
        this.setState({availability: null})
        this.setState({service: null})
        this.setState({worker: null})
        this.setState({optionsService: [{value: "none", label: null}]})
        this.setState({optionsAvailability: [{value: "none", label: null}]})
        this.setState({disableCompany: false})
        this.setState({disableWorker: false})
        this.setState({disableService: false})
        this.setState({hasSuccess: false})
        this.setState({hasFail: false})
    }

    async loadCompanies() {
        const options = await getCompanyOptions()
        this.setState({optionsCompany: options})
    }

    async loadWorkers() {
        const options = await getWorkerOptions()
        this.setState({optionsWorker: options})
    }

    async onCompanyChange(company) {
        this.setState({ companyName: company["value"] })     
        const options = await getServiceOptions(company["value"])
        this.setState({optionsService: options})
        this.setState({disableCompany: true})
        this.setState({disableService: false})
    } 

    async onServiceChange(service) {
        this.setState({ service: service["value"] })
        const options = await getWorkerOptions(service["value"], this.state.companyName)
        this.setState({optionsWorker: options})        
        this.setState({disableService: true})
        this.setState({disableWorker: false})
    }

    async onWorkerChange(worker) {
        this.setState({ worker })
        const options = await getAvailabilityOptions(worker["value"], this.state.service)
        this.setState({optionsAvailability: options})
        this.setState({disableWorker: true})
        this.setState({disableAvailability: false})
    }   

    async onAvailabilityChange(availability) {
        this.setState({ availability: availability["value"]})            
    } 

    async onSubmit(e){
        e.preventDefault();

        // Set the userName and userType in component state
        if (this.props.userName != null && this.props.userType != null) {

            this.setState({userName: this.props.userName})
            this.setState({userType: this.props.userType})

            // Validate user type
            if(this.props.userType !== "CUSTOMER") {
                alert("You must be a customer to make bookings. Create a customer account and try again.")
                return 
            }

        } else {
            alert("You must be logged in to make bookings. Please log in.")
            return 
        }

        if (this.state.companyName == null) {
            alert("Please select a company.")
            return
        }
        if (this.state.availability == null) {
            alert("Please select a timeslot.")
            return
        }
        if (this.state.worker == null) {
            alert("Please select a worker.")
            return
        }            

        // Send the POST request
        const success = await createBooking({
            updated_At: currentTime(),
            worker: {user: {userName: this.state.worker.value}},
            timeslot: {date: this.state.availability},
            service: {name: this.state.service},
            customer: {user: {userName: this.props.userName}}
        }).then()

        // Set success/fail state, will change what the pane is rendering
        if (success) {
            this.setState({hasSuccess: true})
            this.setState({hasFail: false})
        } else {
            this.setState({hasSuccess: false})
            this.setState({hasFail: true})
        }

    }

    render() {

        const animatedComponents = makeAnimated();

        // Booking input panel
        if (!this.state.hasSuccess && !this.state.hasFail) { 

            var reset_url
            if (window.location.pathname === "/bookings" ) {
                reset_url = "/bookings_reset"
            } else if (window.location.pathname === "/bookings_reset") {
                reset_url = "/bookings"
            }

            return (
                <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                    <br/>    
                    <b>Get started by choosing a service provider</b>
                    <br/>   <br/>   

                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label htmlFor="companyName">Select a company:</label>
                            <Select name={"companyName"} value={this.state.value} options={this.state.optionsCompany}
                                onChange={this.onCompanyChange} components={animatedComponents} isDisabled={this.state.disableCompany}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="service">Select a service:</label>
                            <Select name={"service"} value={this.state.value} options={this.state.optionsService}
                                onChange={this.onServiceChange} components={animatedComponents} isDisabled={this.state.disableService}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="worker">Select a worker:</label>
                            <Select name={"worker"} value={this.state.value} options={this.state.optionsWorker}
                                onChange={this.onWorkerChange} components={animatedComponents} isDisabled={this.state.disableWorker}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="availability">Select an available timeslot:</label>
                            <Select name={"availability"} value={this.state.value} options={this.state.optionsAvailability}
                                onChange={this.onAvailabilityChange}components={animatedComponents} isDisabled={this.state.disableAvailability}/>
                        </div>
                        
                        <div className="row">
                            <div className="col-sm">
                            <input type="submit" className="btn btn-sm btn-dark" id="navButton"/>

                            </div>
                            <div className="col-sm">
                                <Link to="/Dashboard" className="btn btn-sm btn-dark" id="navButton">Cancel</Link>        
                            </div>
                        </div>
                    </form>

                    <div className="row-sm">
                    <br/>
                        <div className="col-sm">
                        </div>
                        
                        <div className="col-sm">
                        
                        <Link to={reset_url} className="btn btn-sm btn-dark" id="navButton">Reset form</Link>        
                    </div>

                        <div className="col-sm">
                            
                        </div>
                    </div>
                </div>
            )

        // Successful booking
        }if (this.state.hasSuccess) {
            return (
                <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                    <br/>    
                    <b>Booking placed successfully. Thanks, {this.props.userName}.</b>
                    <br/><br/>   
                    <Link to="/my_bookings">View your bookings.</Link>
                    <br/><br/>  
                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.refresh}>
                                Make another booking
                            </button> 
                        </div>
                        <div className="col-sm">
                            <CancelButton/>
                        </div>
                    </div>
                </div>   
            )

        // Failed booking
        } else if (this.state.hasFail) {
            return (
                <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                    <br/>    
                    <b>Booking failed. Please try again.</b>
                    <br/><br/>   
                
                <div className="row">
                    <div className="col-sm">
                        <button className="btn btn-sm btn-dark" id="navButton" onClick={this.refresh}>
                            Make another booking
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

export default BookingPane;
