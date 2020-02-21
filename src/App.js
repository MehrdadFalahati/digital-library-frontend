import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

const asyncContentType = asyncComponent(() => {
    return import('./containers/ContentType/ContentType');
});

const asyncLibrary = asyncComponent(() => {
    return import('./containers/Library/Library');
});

const asyncAttachmentType = asyncComponent(() => {
    return import('./containers/AttachmentType/AttachmentType');
});

const asyncContent = asyncComponent(() => {
    return import('./containers/Content/Content');
});

const asyncViewContent = asyncComponent(() => {
    return import('./containers/Content/View/ContentView');
});

const asyncHome = asyncComponent(() => {
    return import('./containers/Libraries/Libraries');
});

const asyncViewLibrary = asyncComponent(() => {
    return import('./containers/Libraries/View/LibraryView');
});

class App extends Component {
    componentDidMount () {
        this.props.onTryAutoSignup();
    }
  render() {
      let routes = (
          <Switch>
              <Route path="/auth" component={asyncAuth} />
              <Route path="/book-view/:id" component={asyncViewLibrary}/>
              <Route path="/" component={asyncHome}/>
              <Redirect to="/"/>
          </Switch>
      );

      if ( this.props.isAuthenticated ) {
          routes = (
              <Switch>
                  <Route path="/auth" component={asyncAuth} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/content-type" component={asyncContentType} />
                  <Route path="/library" component={asyncLibrary} />
                  <Route path="/attachment-type" component={asyncAttachmentType} />
                  <Route path="/content" component={asyncContent} />
                  <Route path="/view-content/:id" component={asyncViewContent}/>
                  <Route path="/book-view/:id" component={asyncViewLibrary}/>
                  <Route path="/" component={asyncHome}/>
                  <Redirect to="/" />
              </Switch>
          );
      }

      return (
          <div>
              <Layout>
                  {routes}
              </Layout>
          </div>
      );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actions.authCheckState() )
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );

