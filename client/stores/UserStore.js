import { observable, action } from 'mobx';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

let store = null;

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

class UserStore {
    @observable id;
    @observable email = '';
    @observable isSignedIn = false;

    constructor(isServer, user) {
        if (user) {
            this.id = user._id;
            this.email = user.email;
            this.isSignedIn = true;
        }
    }

    @action signIn(payload) {
        // TODO: move into data service
        fetch('/api/user/signin', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(handleErrors)
        .then(this.signInSuccess)
        .catch(this.signInFailed);
    }

    @action.bound signInSuccess() {
        Router.push('/wishes');
    }

    @action.bound signInFailed(error) {
        console.error(error);
    }

    @action.bound signUserOut() {
        fetch('/api/user/signout', {
            credentials: 'same-origin'
        })
        .then(handleErrors)
        .then(this.signOutSuccess)
        .catch(err => {
            // TODO: handle error
            console.error(err);
        });
    }

    @action.bound signOutSuccess() {
        this.id = null;
        this.email = '';
        this.isSignedIn = false;

        Router.push('/');
    }
}

export function initStore(isServer, user) {
    if (store === null) {
        store = new UserStore(isServer, user);
    }
    return store;
}