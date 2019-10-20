import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginForm extends React.Component {
    state = {
        userLogin: '',
        userPassword: '',

        userLoginError: false,
        userPasswordError: false,
    };

    handeleChangeLogin = (event) => {
        event.preventDefault();
        const { target } = event;
        console.log(target.value);
        this.setState({
            userLogin: target.value.trimRight(),
        });
    }

    handeleChangePasword = (event) => {
        const { target } = event;
        console.log(target.value);
        this.setState({
            userPassword: target.value.trimRight(),
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { userPassword, userLogin } = this.state;
        const { users, login } = this.props;

        const findLogin = users.find(user => user.login === userLogin) === undefined
            ? undefined
            : users.find(user => user.login === userLogin).login;


        const findPassword = users.find(user => user.login === findLogin && user.password === userPassword) === undefined
            ? undefined
            : users.find(user => user.login === findLogin && user.password === userPassword).password;


        if (findLogin === undefined) {
            this.setState({
                userLoginError: true,
            });
        } else if (findPassword === undefined) {
            this.setState({
                userLoginError: false,
                userPasswordError: true,
            });
        } else {
            const { match : { history}, handleLogin } = this.props;
            console.log(history)
            history.push(`/user/${findLogin}`);
            this.setState({
                userLogin: '',
                userPassword: '',

                userLoginError: false,
                userPasswordError: false,
            });
            login(findLogin, findPassword);
            handleLogin();
        }
    }

    render() {
        const { userLogin, userPassword, userLoginError, userPasswordError } = this.state;
        return (
            <div className="container">
                <p className="form-title">Login</p>
                <form
                    onSubmit={(event) => this.handleSubmit(event)}
                >
                    <div className="form-input">
                        {userLoginError && (
                            <small>User not found</small>
                        )}
                        {userPasswordError && (
                            <small>Incorrect password</small>
                        )}
                        <TextField
                            id="outlined-name"
                            label="Login"
                            value={userLogin}
                            onChange={this.handeleChangeLogin}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            type="password"
                            id="outlined-name"
                            label="Password"
                            value={userPassword}
                            onChange={this.handeleChangePasword}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button variant="contained" type="submit" color="primary" className="submit-button" style={{ marginTop: 10 }}>
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}


export default LoginForm;