import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Contact extends Component {
    state = {
        showContactInfo: false
    };

    onShowClick = () => {
        // Updating state (cannot directly manipulate it)
        this.setState({showContactInfo: !this.state.showContactInfo}); // sets to the opposite
    }

    // In arrow functions put async beside parameters.
    onDeleteClick = async (id, dispatch) => {
        // Delete request
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

        dispatch({type: 'DELETE_CONTACT', payload: id})
    }

    // // Without using async
    // onDeleteClick = (id, dispatch) => {
    //     // Delete request
    //     axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then(response => dispatch({type: 'DELETE_CONTACT', payload: id}));
    // }

    render() {
        // Destructering for efficiency
        const { id, name, email, phone } = this.props.contact;
        const { showContactInfo } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4 style={{color: '#0b78e5'}}>{name} 
                            <i onClick={this.onShowClick} className="fas fa-sort-down" style={{cursor: 'pointer'}}>
                            </i>
                            <i className="fas fa-times" style={{cursor: 'pointer', float: 'right', color: '#e55040'}} onClick={this.onDeleteClick.bind(this, id, dispatch)}>
                            </i>

                            <Link to={`contact/edit/${id}`}>
                                <i 
                                className="fas fa-pencil-alt"
                                style={{
                                    cursor: 'pointer',
                                    float: 'right',
                                    color: '#777777',
                                    marginRight: '1rem'
                                }}>
                                </i>
                            </Link>

                            </h4>

                            {/* Using a ternery operator for condition check. '?' means if true. ':' means else */}
                            {showContactInfo ? (<ul className="list-group">
                                <li className="list-group-item">Email: {email}</li>
                                <li className="list-group-item">Phone: {phone}</li>
                            </ul>) : null}
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default Contact;