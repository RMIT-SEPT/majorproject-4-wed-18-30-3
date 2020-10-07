import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import { MDBBtn, MDBCollapse } from "mdbreact";

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
        }
    }

    toggleCollapse1=collapse1=>()=>{this.setState(prevState=>({collapse1: prevState.collapse1!==collapse1?collapse1:""}))}
    toggleCollapse2=collapse2=>()=>{this.setState(prevState=>({collapse2: prevState.collapse2!==collapse2?collapse2:""}))}
    toggleCollapse3=collapse3=>()=>{this.setState(prevState=>({collapse3: prevState.collapse3!==collapse3?collapse3:""}))}
    toggleCollapse4=collapse4=>()=>{this.setState(prevState=>({collapse4: prevState.collapse4!==collapse4?collapse4:""}))}
    toggleCollapse5=collapse5=>()=>{this.setState(prevState=>({collapse5: prevState.collapse5!==collapse5?collapse5:""}))}
    toggleCollapse6=collapse6=>()=>{this.setState(prevState=>({collapse6: prevState.collapse6!==collapse6?collapse6:""}))}
    toggleCollapse7=collapse7=>()=>{this.setState(prevState=>({collapse7: prevState.collapse7!==collapse7?collapse7:""}))}

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
                    <p>Click each day to view its availability summary.</p>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse1("basicCollapse1")}>Today</MDBBtn></p>
                        <MDBCollapse id="basicCollapse1" isOpen={this.state.collapse1}>
                    <div className="list-group-item d-flex justify-content-between align-items-center">
                            yeet
                    <span className="badge badge-primary badge-pill">badge</span>
                    </div>
                    </MDBCollapse>
                    



                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse2("basicCollapse2")}>Tomorrow</MDBBtn></p>
                        <MDBCollapse id="basicCollapse2" isOpen={this.state.collapse2}>
                            yeet
                        </MDBCollapse>
                    
                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse3("basicCollapse3")}>Today</MDBBtn></p>
                        <MDBCollapse id="basicCollapse3" isOpen={this.state.collapse3}>
                            yeet
                        </MDBCollapse>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse4("basicCollapse4")}>Today</MDBBtn></p>
                        <MDBCollapse id="basicCollapse4" isOpen={this.state.collapse4}>
                            yeet
                        </MDBCollapse>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse5("basicCollapse5")}>Today</MDBBtn></p>
                        <MDBCollapse id="basicCollapse5" isOpen={this.state.collapse5}>
                            yeet
                        </MDBCollapse>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse6("basicCollapse6")}>Today</MDBBtn></p>
                        <MDBCollapse id="basicCollapse6" isOpen={this.state.collapse6}>
                            yeet
                        </MDBCollapse>

                    <p className="text-left"><MDBBtn onClick={this.toggleCollapse7("basicCollapse7")}>Today</MDBBtn></p>
                        <MDBCollapse id="basicCollapse7" isOpen={this.state.collapse7}>
                            yeet
                        </MDBCollapse>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default AdminBookingSummary;
