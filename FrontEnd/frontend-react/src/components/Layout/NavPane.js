import React, { Component } from 'react'
import DashboardLinkButton from './DashboardLinkButton'
import BookingLinkButton from './BookingLinkButton';
import ProfileButton from './ProfileButton';
import AdminPortalButton from './AdminPortalButton';
import ContextualButtonPane from './ContextualButtonPane';

class NavPane extends Component {
    render() {
        return (
            <div className="nav_pane" id="nav_pane">
                <br/>
                <b>Navigation</b>
                <br/><br/>
                <DashboardLinkButton/>
                <br/><br/>
                <BookingLinkButton/>
                <br/><br/>
                <ProfileButton/>
                <br/><br/>
                <AdminPortalButton/>
                <br/><br/>
                <ContextualButtonPane/>
            </div>
        )
    }
}

export default NavPane;