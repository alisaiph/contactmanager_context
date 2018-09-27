import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
    // Controlled component - inputs connected to state
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    onChange = (e) => this.setState( {[e.target.name]: e.target.value} );

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

        const newContact = {
            // ES6 syntax, if its same name no need to do name: name, email: email.
            name,
            email,
            phone
        };

        // Post request
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);

        dispatch({type: 'ADD_CONTACT', payload: response.data});

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
                            <div className="card-header">Add Contact</div>
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
                                    <input type="submit" value="Add Contact" className="btn btn-block btn-primary"/>
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default AddContact;