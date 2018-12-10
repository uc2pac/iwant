import { Component } from 'react';
import { Provider } from 'mobx-react';
import Header from '../shared/components/header';
import Layout from '../shared/components/layout/layout';
import { initStore } from '../stores/UserStore';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Layout>
          <h1>Home Page</h1>
        </Layout>
      </div>
    )
  }
}

export default class ProviderWrapper extends Component {
  static getInitialProps({ req, query }) {
      const isServer = !!req;
      const user = query.user || null;
      
      return {
        isServer,
        user
      }
  }

  constructor(props) {
      super(props);
      this.store = initStore(props.isServer, props.user);
  }

  render() {
      return (
          <Provider store={this.store}>
              <HomePage />
          </Provider>
      )
  }
}