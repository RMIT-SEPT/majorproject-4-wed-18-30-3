import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';

import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16.3'

import NavPane from '../Layout/NavPane';
import EditProfile from './EditProfile';



configure({ adapter: new Adapter() });

describe('<EditProfile/>', function() {
    it('renders header text', function() {
      const wrapper = shallow(<EditProfile/>); 
      const content = <b>Edit Personal Profile</b>;
      expect(wrapper.contains(content)).to.equal(true);
    });
  });


  //this is for testing form or testing Submit action but not work now
  /*  describe('EditProfileForm', () => {
    it('submit profile when click submit', () => {
        const onSubmit = spy();
        const wrapper = mount(
            <form onSubmit={onSubmit} />
        );
        const input = wrapper.find('input');
        input.simulate('submit');
    });
  });
  */

  describe('<EditProfileForm/>', function() {
    it('renders input box', function() {
      const wrapper = shallow(
        <EditProfile>

<form onSubmit = {this.onSubmit}>
        <b>Edit Personal Profile</b>
        <div className="form-group">
            
           

        </div>
        
        <div>
        <input type="text" className="form-control" placeholder="Name" name="userName" />

        </div>
        <br></br>
        <div>
        <input type="text" className="form-control" placeholder="Password" name="password" />

        </div>
        <br></br>
        <div>
        <input type="text" className="form-control" placeholder="Address" name="address" />

        </div>
        <br></br>
        <div>
        <input type="phone" className="form-control" placeholder="Phone" name="phone" />

        </div>
        <br></br>
        <div>
        <input type="submit" className="form-control" placeholder="Submit" name="" />

        </div>
      </form>

        </EditProfile>
      ); 
      expect(wrapper.contains(
        <form onSubmit = {this.onSubmit}>
        <b>Edit Personal Profile</b>
        <div className="form-group">
            
           

        </div>
        
        <div>
        <input type="text" className="form-control" placeholder="Name" name="userName" />

        </div>
        <br></br>
        <div>
        <input type="text" className="form-control" placeholder="Password" name="password" />

        </div>
        <br></br>
        <div>
        <input type="text" className="form-control" placeholder="Address" name="address" />

        </div>
        <br></br>
        <div>
        <input type="phone" className="form-control" placeholder="Phone" name="phone" />

        </div>
        <br></br>
        <div>
        <input type="submit" className="form-control" placeholder="Submit" name="" />

        </div>
      </form>




      )).to.equal(true);
    });
  });

 
