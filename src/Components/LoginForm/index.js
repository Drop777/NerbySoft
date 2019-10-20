import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { login, handleLogin } from '../../store/index';

const mapStateToProps = state => ({
    users: state.users,
});

const mapMethodsToProps = dispatch => ({
    handleLogin: () => dispatch(handleLogin()),
    login: (userLogin, userPassword) => dispatch(login(userLogin, userPassword))
});


const connectedLoginForm = connect(mapStateToProps, mapMethodsToProps)(LoginForm);

export {
    connectedLoginForm as LoginForm
}