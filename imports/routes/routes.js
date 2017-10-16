import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup/Signup';
import Dashboard from '../ui/Dashboard/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login/Login';
import Home from '../ui/Home';
import Library from '../ui/Library/Library';
import LibraryItem from '../ui/Library/LibraryItem/LibraryItem';
import ScalesAndArpeggios from '../ui/ScalesAndArpeggios/ScalesAndArpeggios';
import Practice from '../ui/Practice/Practice';


const onEnterLibraryPage = (nextState) => {
  Session.set('selectedPieceId', nextState.params.id);
};

const onLeaveLibraryPage = () => {
  // clear selectedPieceId when user logs out //
  Session.set('selectedPieceId', undefined);
}


export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const globalOnChange = (prevState, nextState) => {
  // console.log('globalOnChange');
  globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  // console.log('globalOnEnter');
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
}


export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Home} privacy="unauth" />
      <Route path="/signup" component={Signup} privacy="unauth" />
      <Route path="/dashboard" component={Dashboard} privacy="auth" />
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" />
      <Route path="/library" component={Library} privacy="auth" />
      <Route path="/library/:id" component={LibraryItem} onEnter={onEnterLibraryPage} onLeave={onLeaveLibraryPage} privacy="auth" />
      <Route path="/scales" component={ScalesAndArpeggios} privacy="auth" />
      <Route path="/start-practice" component={Practice} privacy="auth" />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
