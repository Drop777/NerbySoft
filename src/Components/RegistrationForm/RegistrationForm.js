import React from 'react';
import './RegistrationForm.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RegistrationForm extends React.Component {
    state = {
        userName: '',
        userLogin: '',
        userPassword: '',

        userNameError: false,
        userLoginError: false,
        isExist: false,
        userPasswordError: false,
    }

    handeleChangeName = (event) => {
        const { target } = event;
        console.log(target.value);
        this.setState({
            userName: target.value.trimRight(),
        });
    };

    handeleChangeLogin = (event) => {
        event.preventDefault();
        const { target } = event;
        console.log(target.value);
        this.setState({
            userLogin: target.value.trimRight(),
        });
    };

    handeleChangePasword = (event) => {
        const { target } = event;
        console.log(target.value);
        this.setState({
            userPassword: target.value.trimRight(),
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const {
            userLogin,
            userPassword,
            userName,
        } = this.state;
        const { register, users } = this.props;

        if (userName === '' && userLogin === '' && userPassword === '') {
            this.setState({
                userNameError: true,
                userLoginError: true,
                userPasswordError: true,
            });
        } else if (userLogin === '') {
            this.setState({
                userLoginError: true,
            });
        } else if (userPassword === '') {
            this.setState({
                userPasswordError: true,
            });
        } else if (users.find(user => user.login === userLogin)) {
            this.setState({
                isExist: true,
            })
        } else {
            const { history } = this.props;
            this.setState({
                userName: '',
                userLogin: '',
                userPassword: '',

                userNameError: false,
                userLoginError: false,
                isExist: false,
                userPasswordError: false,
            });
            register(userLogin, userPassword, userName);
            history.push(`/login`)
        }
    }

    render() {
        const {
            userLogin,
            userPassword,
            userName,
            userNameError,
            userLoginError,
            userPasswordError,
            isExist
        } = this.state;

        return (
            <div className="container">
                <p className="form-title">Registration</p>
                <form
                    className="form"
                    onSubmit={(event) => this.handleSubmit(event)}
                >
                    <div className="form-input">
                        <TextField
                            error={userNameError}
                            id="outlined-name"
                            label="Name"
                            value={userName}
                            onChange={this.handeleChangeName}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            error={userLoginError}
                            id="outlined-name"
                            label="Login"
                            value={userLogin}
                            onChange={this.handeleChangeLogin}
                            margin="normal"
                            variant="outlined"
                        />
                        {isExist && (
                            <small>Yze est</small>
                        )}
                        <TextField
                            error={userPasswordError}
                            id="outlined-name"
                            label="Password"
                            type="password"
                            value={userPassword}
                            onChange={this.handeleChangePasword}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button variant="contained" type="submit" color="primary" className="submit-button" style={{ marginTop: 10 }}>
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
};

export default RegistrationForm;