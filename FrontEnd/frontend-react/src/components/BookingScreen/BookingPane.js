import React, { Component } from 'react'
import axios from "axios";
import CancelButton from './CancelButton';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

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

    function refresh() {window.location.reload(false)}

    const capitalise = (string) => {
        if (typeof string !== 'string') return ''
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    // Header config for REST requests
    const axiosConfig = {headers: {'Content-Type': 'application/json'}}

    // Send a create booking request to bookings endpoint
    async function createBooking(newBooking) {

        console.log(newBooking)
        return await axios.post('http://localhost:8080/api/booking', {
            id: newBooking.id,
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

    // Return an array of all timeslot objects
    async function getTimeslots() {
        return await axios.get('http://localhost:8080/api/timeslot/all').then(response => {
            return response.data
        })
    }

    // Return an array of all booking objects
    async function getBookings() {
        return await axios.get('http://localhost:8080/api/booking/all').then(response => {
            return response.data
        })
    }

    // Return an array of all worker objects
    async function getWorkers() {
        return await axios.get('http://localhost:8080/api/worker/all').then(response => {
            return response.data
        })
    }

    // Return relevant options depending on selection
    async function getWorkerOptions() {
        const wks = await getWorkers().then()
        var workerOptions = []

        // Get all workers names
        for (let i = 0; i < wks.length; i++) {               
            workerOptions.push({
                value: {id: wks[i]["id"], userName: wks[i]["userName"]},
                label: capitalise(wks[i]["userName"])})
        }
        return workerOptions
    }

    // Return relevant options depending on selection
    async function getServiceOptions(component) {
        const avs = await getBookings().then()
        var serviceOptions = []
        var temp = []

        
        // Get services offered by selected worker
        for (let i = 0; i < avs.length; i++) {               
            if (avs[i]["customer"] === null && avs[i]["worker"]["userName"] === component["label"]) {
                for (let j = 0; j < avs[i]["worker"]["services"].length; j++) {               
                    var nameString = avs[i]["worker"]["services"][j]["name"]
                    if (temp.includes(nameString) === false) {
                        temp.push(nameString)
                        serviceOptions.push({value: {id: avs[i]["worker"]["services"][j]["id"], name: nameString}, label: capitalise(nameString)})
                    }
                }
            }
        }
        return serviceOptions
    }

        // Return relevant options depending on selectbox type
        async function getAvailabilityOptions(workerName, component) {
        const avs = await getBookings().then()
        var availOptions = []

        // Get services offered by selected worker
        for (let i = 0; i < avs.length; i++) {               
            if (avs[i]["customer"] === null && avs[i]["worker"]["userName"] === workerName["value"]["userName"]) {
                const timeslot = {id: avs[i]["timeslot"]["id"], timeslot: avs[i]["timeslot"]["date"]}
                const label = avs[i]["timeslot"]["date"]
                availOptions.push({value: timeslot, label: label})
            }
        }
        return availOptions
    }

class BookingPane extends Component {

    constructor() {
        super()
        this.state = {
            availability: null,
            service: null,
            worker: null,
            customer: null,
            customerId: null,
            
            optionsService: [{value: "none", label: null}],
            optionsAvailability: [{value: "none", label: null}],
            optionsWorker: this.loadWorkers(),      
            
            disableWorker: false,
            disableService: false,

            hasSuccess: false,
            hasFail: false
            
        }

        this.loadWorkers = this.loadWorkers.bind(this);
        this.onWorkerChange = this.onWorkerChange.bind(this);
        this.onServiceChange = this.onServiceChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    toggleDisableWorker = () => this.setState(prevState => ({disableWorker: !prevState.disableWorker}))
    toggleDisableService = () => this.setState(prevState => ({disableService: !prevState.disableService}))
    onAvailabilityChange = availability => this.setState({ availability })
    showModal = e => {this.setState({show: !this.state.show})}

    async loadWorkers() {
        const options = await getWorkerOptions()
        this.setState({optionsWorker: options})
    }

    async onWorkerChange(worker) {
        this.setState({ worker })
        
        // Populate services with services the worker offers
        const options = await getServiceOptions(worker)
        this.setState({optionsService: options})
        this.setState({disableWorker: true})
    }   

    async onServiceChange(service) {
        this.setState({ service })
        
        if (this.state.worker != null) {
            // Populate timeslots accoring to worker service availablility
            const options = await getAvailabilityOptions(this.state.worker, service)
            this.setState({optionsAvailability: options})
            this.setState({disableService: true})
        }
    } 

    async onSubmit(e){
        e.preventDefault();

        if (this.state.availability == null) {
            alert("Please select a timeslot.")
            return
        }
        if (this.state.service == null) {
            alert("Please select a service.")
            return
        }
        if (this.state.worker == null) {
            alert("Please select a worker.")
            return
        }            

        // Get this from React state/component props after login is done
        const customerId = 1

        // Send the POST request
        const success = await createBooking({
            id: this.state.availability["value"]["id"],
            updated_At: currentTime(),
            worker: {id: this.state.worker.value["id"]},
            timeslot: {date: this.state.availability["value"]["timeslot"]},
            service: {id: this.state.service.value["id"]},
            customer: {id: customerId}
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
            return (
                <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">

                    <br/>    
                    <b>Get started by choosing a worker.</b>
                    <br/>   <br/>   
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label htmlFor="worker">Select a worker:</label>
                            <Select name={"worker"} value={this.state.value} options={this.state.optionsWorker}
                                onChange={this.onWorkerChange} components={animatedComponents} isDisabled={this.state.disableWorker}/>
                        </div>
                                        
                        <div className="form-group">
                            <label htmlFor="service">Select a service:</label>
                            <Select name={"service"} value={this.state.value} options={this.state.optionsService}
                                onChange={this.onServiceChange} components={animatedComponents} isDisabled={this.state.disableService}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="availability">Select an available timeslot:</label>
                            <Select name={"availability"} value={this.state.value} options={this.state.optionsAvailability}
                                onChange={this.onAvailabilityChange} components={animatedComponents}/>
                        </div>
                        
                        <div className="row">
                            <div className="col-sm">
                            <input type="submit" className="btn btn-sm btn-dark" id="navButton"/>

                            </div>
                            <div className="col-sm">
                                <CancelButton/>
                            </div>
                        </div>
                    </form>

                    <div className="row-sm">
                    <br/>
                        <div className="col-sm">
                        </div>
                        
                        <div className="col-sm">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.refresh}>
                                Reset
                            </button>           
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
                    <b>Booking placed successfully.</b>
                    <br/><br/>   

                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={refresh}>
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
                        <button className="btn btn-sm btn-dark" id="navButton" onClick={refresh}>
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
