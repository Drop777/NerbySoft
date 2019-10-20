import { connect } from 'react-redux';
import App from './App';
import { handleLogout } from '../../store/index';

const mapMethodsToProps = dispatch => ({
    handleLogout: () => dispatch(handleLogout()),
});

const mapStateToProps = state => ({
     isLogged: state.isLogged,
});

const connetedApp = connect(mapStateToProps, mapMethodsToProps)(App)

export {
    connetedApp as App
}