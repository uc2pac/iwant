import { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { initStore } from '../../stores/UserStore';

@inject('store')
@observer
class SignInPage extends Component {
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

        this.props.store.signIn({email, password});
    }

    render() {
        const { email, password } = this.state;

        return (
            <div>
                <div className="row">
                    <div className="col-sm-6 mr-auto ml-auto">
                        <div className="card mt-3 mb-3">
                            <h4 className="card-header">Sign In</h4>
                            <div className="card-body">
                                <form onSubmit={(event) => this.onSubmit(event)}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="exampleInputEmail1" 
                                            aria-describedby="emailHelp" 
                                            placeholder="Enter email" 
                                            value={email}
                                            onChange={(event) => this.onEmailChange(event)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="exampleInputPassword1" 
                                            placeholder="Password" 
                                            value={password}
                                            onChange={(event) => this.onPasswordChange(event)}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                    >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default class ProviderWrapper extends Component {
    static getInitialProps({ req }) {
        const isServer = !!req   
        const store = initStore(isServer)
        return {
          isServer
        }
    }

    constructor(props) {
        super(props);
        this.store = initStore(props.isServer);
    }

    render() {
        return (
            <Provider store={this.store}>
                <SignInPage />
            </Provider>
        )
    }
}