import { connect } from 'react-redux';
import RegistrationForm from './RegistrationForm';
import { register } from '../../store/index';

const mapMethodsToProps = dispatch => ({
    register: (newLogin, newPass, newName) => dispatch(register(newLogin, newPass, newName))
});

const mapStateToProps = state => ({
    users: state.users,
});

const connectedForm = connect(mapStateToProps, mapMethodsToProps)(RegistrationForm);

export {
    connectedForm as RegistrationForm
}