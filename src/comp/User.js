import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserConsumer from '../context';

export class User extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isVisible: false
      };
   }

   clickHandler = () => {
      this.setState({
         isVisible: !this.state.isVisible
      });
   };

   onDeleteUser = (dispatch, e) => {
      const { id } = this.props;
      // Consumer Dispatch
      dispatch({ type: 'DELETE_USER', payload: id });
   };

   render() {
      const { name, department, salary } = this.props;
      const { isVisible } = this.state;
      return (
         <UserConsumer>
            {value => {
               const { dispatch } = value;
               return (
                  <div>
                     <div className="col-sm-6 offset-sm-3 mb-4">
                        <div className="card" style={isVisible ? { backgroundColor: '#c23616', color: 'white' } : null}>
                           <div className="card-header d-flex justify-content-between" style={{ cursor: 'pointer' }}>
                              <h4 className="d-inline" onClick={this.clickHandler}> {name} </h4>
                              <i className="far fa-trash-alt" style={{ cursor: 'pointer' }} onClick={this.onDeleteUser.bind(this, dispatch)}></i>
                           </div>

                           {isVisible ? (
                              <div className="card-body">
                                 <p className="card-text">Maaş : {salary}</p>
                                 <p className="card-text"> Departman : {department} </p>
                              </div>
                           ) : null}
                        </div>
                     </div>
                  </div>
               );
            }}
         </UserConsumer>
      );
   }
}

User.propTypes = {
   /* isRequired Kullanımı */
   name: PropTypes.string.isRequired,
   department: PropTypes.string.isRequired,
   salary: PropTypes.string.isRequired,
   id: PropTypes.string.isRequired
};

User.defaultProps = {
   /* Default Değer */
   name: 'İsim Yok',
   department: 'Departman Yok',
   salary: 'Maaş Yok'
};
export default User;
