import React, { Component } from 'react';

class Test extends Component {
    state = {
        title: '',
        body: ''
    };

    componentDidMount() { // Runs after the component is rendered. Mainly used for http calls
        console.log('componentDidMount');

        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(data => this.setState({
            title: data.title,
            body: data.body
        }));
    }

    componentWillMount() { // Runs before DidMount
        console.log('componentWillMount');
    }

    componentDidUpdate() { // Runs after an update to the component
        console.log('componentDidUpdate');
    }

    componentWillUpdate() { // Runs before an update to the component
        console.log('componentWillUpdate');
    }

    componentWillReceiveProps(nextProps, nextState) { // Runs when component receive new properties
        console.log('componentWillReceiveProps');
    }

    static getDerivedStateFromProps(nextProps, prevState) { // Newer version of componentWillReceiveProps

    }

    getSnapshotBeforeUpdate(prevProps, prevState) { // Runs before changes are made (before dom is updated)
        
    }

    render() {
        const { title, body } = this.state;
        return (
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        )
    }
}

export default Test;