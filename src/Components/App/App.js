import React from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import { RegistrationForm } from '../RegistrationForm/index';
import { LoginForm } from '../LoginForm/index';
import { TodoList } from '../TodoList/index';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class App extends React.Component {

  render() {
    const { handelLogin, handleLogout,  isLogged } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <div>
              <AppBar position="static">
                <Toolbar className="nav-bar">
                  <Typography variant="h6" >
                    Task manager
                  </Typography>
                 {! isLogged && (
                    <div>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Login</Button></Link>
                    <Link to="/registration" style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Registration</Button></Link>
                    </div>
                 )}
                 { isLogged && (
                   <div>
                     <Link to="/login" style={{ textDecoration: 'none', color: 'white' }} onClick={handleLogout}><Button color="inherit">Logout</Button></Link>
                   </div>
                 )}
                </Toolbar>
              </AppBar>
            </div>
          </header>
          <main>
          <Switch>
              <Route path="/login" render={(match) => <LoginForm match={match} handelLogin={handelLogin}/>} />
              <Route path="/registration" component={RegistrationForm} />
          </Switch>
            <Route path="/user/:login" component={TodoList} />
          </main>
          <footer className="App-footer"/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
