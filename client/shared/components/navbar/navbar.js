import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import './navbar.scss';

@inject('store') @observer
export default class extends Component {
    render() {
        const { isSignedIn, signUserOut } = this.props.store;

        console.log(isSignedIn);

        return (
            <div className="top-navbar bg-dark d-flex">
                <div className="col-2"></div>
                <ul className="nav col-8 justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    { isSignedIn && [
                        <li className="nav-item" key="wishes">
                            <Link href="/wishes/wishes">
                                <a className="nav-link" href="#">Wishes</a>
                            </Link>
                        </li>
                    ]}
                </ul>

                <ul className="nav col-2">
                    { !isSignedIn && [
                        <li className="nav-item" key="signin">
                            <Link href="/auth/signin">
                                <a className="nav-link" href="#">Sign In</a>
                            </Link>
                        </li>,
                        <li className="nav-item" key="signup">
                            <Link href="/auth/signup">
                                <a className="nav-link" href="#">Sign Up</a>
                            </Link>
                        </li>
                    ]}
                    { isSignedIn && 
                        <li className="nav-item">
                            <a 
                                className="nav-link" 
                                href="#" 
                                onClick={signUserOut}>Sign Out</a> 
                        </li>
                    }
                </ul>
            </div>
        )
    }
}