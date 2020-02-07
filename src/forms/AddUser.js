import React, { Component } from 'react';
import posed from 'react-pose';
import UserConsumer from '../context';
import Axios from 'axios';


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
      salary: '',
      error: false
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

   validateForm = () => {
      const { name, salary, department } = this.state;
      if (name === "" || salary === "" || department === "") {
         return false;
      }
      return true;
   }

   addUser = async (dispatch, e) => {
      e.preventDefault();
      const { name, department, salary } = this.state;

      const newUser = {
         name,
         department,
         salary
      }

      if (!this.validateForm()) {
         this.setState({
            error: true
         })
         return;
      }

      const response = await Axios.post("http://localhost:3002/users", newUser)
      dispatch({ type: "ADD_USER", payload: response.data })

      this.props.history.push("/"); // return index
   }





   render() {
      const { isVisible, name, department, salary, error } = this.state;

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
                           {
                              error ?
                                 <div className="alert alert-danger">
                                    Lütfen bilgilerinizi kontrol ediniz..
                              </div> : null
                           }
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
