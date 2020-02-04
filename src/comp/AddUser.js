import React, { Component } from 'react';
import posed from 'react-pose';
import UserConsumer from '../context';

var uniqid = require('uniqid');

const Animation = posed.div({
   visible: {
      opacity: 1,
      applyAtStart: {
         display: 'block'
      }
   },
   hidden: {
      opacity: 0,
      applyAtEnd: {
         display: 'none'
      }
   }
});
class AddUser extends Component {
   state = {
      isVisible: false,
      name: '',
      department: '',
      salary: ''
   };

   changeVisibility = e => {
      this.setState({
         isVisible: !this.state.isVisible
      });
   };


   changeInput = e => {
      this.setState({
         [e.target.name]: e.target.value // Input data 
      })
   }

   addUser = (dispatch, e) => {
      e.preventDefault();
      const { name, department, salary } = this.state;

      const newUser = {
         id: uniqid(),
         name,
         department,
         salary
      }

      dispatch({ type: "ADD_USER", payload: newUser })
   }



   render() {
      const { isVisible, name, department, salary } = this.state;

      return <UserConsumer>
         {value => {
            const { dispatch } = value;
            return (
               <div className="col-sm-6 offset-sm-3 mb-4">
                  <button onClick={this.changeVisibility} className="btn btn-success btn-block mb-2">
                     {isVisible ? 'Hide From' : 'Show Form'}
                  </button>

                  <Animation pose={isVisible ? 'visible' : 'hidden'}>
                     <div className="card">
                        <div className="card-header">
                           <h4>Add User From</h4>
                        </div>
                        <div className="card-body">
                           <form onSubmit={this.addUser.bind(this, dispatch)}>
                              <div className="form-group">
                                 <label htmlFor="name">Name</label>
                                 <input
                                    type="text"
                                    name="name"
                                    id="id"
                                    placeholder="Enter Name"
                                    className="form-control"
                                    autoComplete="off"
                                    value={name}
                                    onChange={this.changeInput}
                                 />
                              </div>
                              <div className="form-group">
                                 <label htmlFor="department">Department</label>
                                 <input
                                    type="text"
                                    name="department"
                                    id="department"
                                    placeholder="Enter Department"
                                    className="form-control"
                                    autoComplete="off"
                                    value={department}
                                    onChange={this.changeInput}
                                 />
                              </div>
                              <div className="form-group">
                                 <label htmlFor="salary">Salary</label>
                                 <input
                                    type="text"
                                    name="salary"
                                    id="salary"
                                    placeholder="Enter Salary"
                                    className="form-control"
                                    autoComplete="off"
                                    value={salary}
                                    onChange={this.changeInput}
                                 />
                              </div>

                              <button type="submit" className="btn btn-primary btn-block">Add User</button>
                           </form>
                        </div>
                     </div>
                  </Animation>
               </div>
            );
         }}
      </UserConsumer>



   }
}

export default AddUser;
