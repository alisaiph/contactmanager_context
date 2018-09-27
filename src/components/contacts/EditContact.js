import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
    // Controlled component - inputs connected to state
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const contact = response.data;

        this.setState({
            name: contact.name,
            email:contact.email,
            phone:contact.phone
        });
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { name, email, phone } = this.state

        // Check for Errors
        if(name === ''){
            this.setState({errors: {name: 'Name is required'}});
            return;
        }
        if(email === ''){
            this.setState({errors: {email: 'Email is required'}});
            return;
        }
        if(phone === ''){
            this.setState({errors: {phone: 'Phone is required'}});
            return;
        }

        const updateContact = {
        // es6 syntax
            name,
            email,
            phone
        }

        // Getting the id from url
        const { id } = this.props.match.params;

        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact); // second parameter is sending data along.

        dispatch({type: 'UPDATE_CONTACT', payload: response.data});

        // Resetting form after submit
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        // Redirecting to home after submit
        this.props.history.push('/');
    };

    render() {
        const { name, email, phone, errors} = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Edit Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup 
                                        label="Name"
                                        name="name"
                                        placeholder="Enter Name..."
                                        value={name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <TextInputGroup 
                                        label="Email"
                                        name="email"
                                        placeholder="Enter Email..."
                                        value={email}
                                        type="email"
                                        onChange={this.onChange}
                                        error={errors.email}
                                    />
                                    <TextInputGroup 
                                        label="Phone"
                                        name="phone"
                                        placeholder="Enter Phone..."
                                        value={phone}
                                        onChange={this.onChange}
                                        error={errors.phone}
                                    />
                                    <input type="submit" value="Update Contact" className="btn btn-block btn-primary"/>
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default EditContact;