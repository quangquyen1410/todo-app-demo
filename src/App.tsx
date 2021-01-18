import React, { useMemo } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import OpenMenu from './components/OpenMenu';

import ListUser from './features/User';
import Container from '@material-ui/core/Container';
import CreateUser from './features/User/createUser';
import { loadLocale } from './locales/i18n';



function App() {

  useMemo(() => {
    loadLocale()
  }, [])
  return (
    <div className="App">
      <Container maxWidth="lg">
        <BrowserRouter>
          <OpenMenu />
          <Switch>
            <Redirect exact from="/" to="/trang-chu" />
            <Route exact path="/trang-chu" component={ListUser} />
            <Route exact path="/cap-nhat" component={CreateUser} />
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
