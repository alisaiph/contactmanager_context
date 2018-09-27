import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

// Context Reducer
const reducer = (state, action) => {
    switch(action.type) {
        case 'DELETE_CONTACT':
            return {
                ...state, // existing state
                contacts: state.contacts.filter(contact => contact.id !== action.payload) // payload will  be the parameters passed when used. in this case ID.
            };
        case 'ADD_CONTACT':
            return {
                ...state, // existing state
                contacts: [action.payload, ...state.contacts] // inserting newContacts to contacts array.   
            };
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                contact.id === action.payload.id ? (contact = action.payload) : contact)
            };
        default:
            return state;
    }
};

// In other words, a global state (Context API)
export class Provider extends Component {
    state = {
        contacts: [
            
        ],
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
    }

    // Using async await
    async componentDidMount() {
        // Get request using Axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        this.setState({contacts: response.data});
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;