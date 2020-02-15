import React, { Component } from 'react';
import Axios from 'axios';
const UserContext = React.createContext();
// Provider, Consumer

const reducer = (state, action) => {
   switch (action.type) {
      case 'DELETE_USER':
         return {
            ...state,
            users: state.users.filter(user => action.payload !== user.id)
         };

      case 'ADD_USER':
         return {
            ...state,
            users: [...state.users, action.payload]

         };
      case 'UPDATE_USER':
         return {
            ...state,
            users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
         }
      default:
         return state;
   }
};
export class UserProvider extends Component {
   state = {
      users: [
         {
            id: "uniq-1",
            name: "Furkan Çakıcı",
            salary: "5000",
            department: "Bilişim"
         },
         {
            id: "uniq-2",
            name: "Cemal Yıldırım",
            salary: "4000",
            department: "Pazarlama"
         },
         {
            id: "uniq-3",
            name: "Alperen Şen",
            salary: "3500",
            department: "Depo"
         }
      ],
      dispatch: action => {
         this.setState(state => reducer(state, action));
      }
   };

   componentDidMount = async () => {
      const response = await Axios.get("http://localhost:3002/users")
      this.setState({
         users: response.data
      })
   }


   render() {
      return (
         <UserContext.Provider value={this.state}>
            {this.props.children}
         </UserContext.Provider>
      );
   }
}

const UserConsumer = UserContext.Consumer;
export default UserConsumer;
