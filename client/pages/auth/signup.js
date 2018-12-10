import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange(field) {
        const { value } = field.target;
        this.setState({email: value});
    }

    onPasswordChange(field) {
        const { value } = field.target;
        this.setState({password: value});
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;

        // TODO: move into data service
        fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then(response => {
            return response.json();
        }).then(message => {
            // do something with message
        }).catch(error => {
            // should be 500 but check status too
        });
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className="row">
                <div className="col-sm-6 mr-auto ml-auto">
                    <div className="card mt-3 mb-3">
                        <h4 className="card-header">Sign Up</h4>
                        <div className="card-body">
                            <form onSubmit={(event) => this.onSubmit(event)}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input 
                                        type="email" 
                                        class="form-control" 
                                        id="exampleInputEmail1" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter email" 
                                        value={email}
                                        onChange={(event) => this.onEmailChange(event)}
                                    />
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input 
                                        type="password" 
                                        class="form-control" 
                                        id="exampleInputPassword1" 
                                        placeholder="Password" 
                                        value={password}
                                        onChange={(event) => this.onPasswordChange(event)}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    class="btn btn-primary"
                                >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}