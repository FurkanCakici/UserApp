import React, { Component } from 'react';
import UserConsumer from '../context';
import Axios from 'axios';




class UpdateUser extends Component {
    state = {
        name: '',
        department: '',
        salary: '',
        error: false
    };



    changeInput = e => {
        this.setState({
            [e.target.name]: e.target.value // Input data 
        })
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await Axios.get(`http://localhost:3002/users/${id}`);
        const { name, salary, department } = response.data;

        this.setState({
            name,
            salary,
            department
        })
    }

    validateForm = () => {
        const { name, salary, department } = this.state;
        if (name === "" || salary === "" || department === "") {
            return false;
        }
        return true;
    }

    UpdateUser = async (dispatch, e) => {
        e.preventDefault();
        //Update User

        const { name, salary, department } = this.state;
        const { id } = this.props.match.params;
        const updateUser = {
            name,
            salary,
            department
        };

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }
        const response = await Axios.put(`http://localhost:3002/users/${id}`, updateUser)

        dispatch({ type: "UPDATE_USER", payload: response.data })

        this.props.history.push("/"); // return index
    }



    render() {
        const { name, department, salary, error } = this.state;

        return <UserConsumer>
            {value => {
                const { dispatch } = value;
                return (
                    <div className="col-sm-6 offset-sm-3 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add User From</h4>
                            </div>
                            {
                                error ?
                                    <div className="alert alert-danger">
                                        Lütfen bilgilerinizi kontrol ediniz..
                              </div> : null
                            }
                            <div className="card-body">
                                <form onSubmit={this.UpdateUser.bind(this, dispatch)}>
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

                                    <button type="submit" className="btn btn-primary btn-block">Update User</button>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            }}
        </UserConsumer>



    }
}

export default UpdateUser;
