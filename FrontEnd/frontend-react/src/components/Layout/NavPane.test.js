import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'
import NavPane from './NavPane';
import AdminPortalButton from './AdminPortalButton';
import BookingLinkButton from './BookingLinkButton';
import ProfileButton from './ProfileButton';
import DashboardLinkButton from './DashboardLinkButton';
import ContextualButtonPane from './ContextualButtonPane';


configure({ adapter: new Adapter() });

describe('<NavPane/>', function() {
  it('renders title text', function() {
    const wrapper = shallow(
        <NavPane>
        <b>Navigation</b>
        </NavPane>
    ); 
    const content = <b>Navigation</b>;
    expect(wrapper.contains(content)).to.equal(true);
  });
});

describe('<BookingPane/>', function() {
    it('renders one <DashBoardLinkButton/> component', function() {
      const wrapper = shallow(
            <NavPane>
            <div className="nav_pane" id="nav_pane"></div>
            </NavPane>
          );
      expect(wrapper.find(DashboardLinkButton)).to.have.lengthOf(1);
    });
});

describe('<BookingPane/>', function() {
    it('renders one <BookingLinkButton/> component', function() {
        const wrapper = shallow(
            <NavPane>
            <div className="nav_pane" id="nav_pane"></div>
            </NavPane>
          );
      expect(wrapper.find(BookingLinkButton)).to.have.lengthOf(1);
    });
});

describe('<BookingPane/>', function() {
    it('renders one <ProfileButton/> component', function() {
        const wrapper = shallow(
            <NavPane>
            <div className="nav_pane" id="nav_pane"></div>
            </NavPane>
          );
      expect(wrapper.find(ProfileButton)).to.have.lengthOf(1);
    });
});

describe('<BookingPane/>', function() {
    it('renders one <AdminPortalButton/> component', function() {
        const wrapper = shallow(
            <NavPane>
            <div className="nav_pane" id="nav_pane"></div>
            </NavPane>
          );
      expect(wrapper.find(AdminPortalButton)).to.have.lengthOf(1);
    });
});

describe('<BookingPane/>', function() {
  it('renders one <ContextualButtonPane/> component', function() {
      const wrapper = shallow(
          <NavPane>
          <div className="nav_pane" id="nav_pane"></div>
          </NavPane>
        );
    expect(wrapper.find(ContextualButtonPane)).to.have.lengthOf(1);
  });
});
