import React from 'react';
import './TodoList.css'
import { TodoItem } from '../TodoItem/index';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class TodosUser extends React.Component {
    state = {
        todo: '',
        currentIndex: 0,
        hasError: false,
        userLoginForshare: '',
    };

    componentDidUpdate

    handleChange = ({ target }) => {
        const { value } = target;

        this.setState({
            todo: value.trimLeft(),
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { todo, currentIndex } = this.state;
        const { addTodo } = this.props;
        if (todo === '') {
            this.setState({
                hasError: true,
            });
        } else {
            const rand = Math.random();
            const newTodo = {
                todoTitle: todo,
                id: currentIndex + rand,
                selected: false,
            };
            this.setState(prevState => ({
                todo: '',
                currentIndex: prevState.currentIndex + 1,
                hasError: false,
            }));


            addTodo(newTodo);
        }
    }

    handeleSelect = ({ target }) => {
        const { value } = target;

        this.setState({
            userLoginForshare: value,
        })
    };

    share = () => {
        const { userLoginForshare } = this.state;
        const { currentUser, shareTodo, unselectTodo } = this.props;
        const todo = [...currentUser.todos].filter(todo => todo.selected === true);
        console.log(todo);
        shareTodo(userLoginForshare, todo, currentUser.login);
        unselectTodo();
    }

    render() {
        const { todo, hasError, userLoginForshare } = this.state;
        const { currentUser, users } = this.props;
        console.log(todo)
        console.log(currentUser)
        const prepereUsers = [...users].filter(user => user.login !== currentUser.login)

        let viewshare = {};
        if (currentUser.todos.some(todo => todo.selected === true)) {
            viewshare = {
                display: 'flex',
                justifyContent: 'space-evenly',
                maxWidth: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
            }
        } else {
            viewshare.display = "none";
        }

        return (
            <>
                <div className="user-card">
                    <Card>
                        <CardContent>
                            <Grid container justify="center" alignItems="center">
                                <Avatar
                                    alt="me"
                                    src="https://66.media.tumblr.com/baea33b98e5aa66abd0e5da888d06c44/tumblr_pkw4y0EZTh1uk7v3v_540.jpg"
                                    style={{ margin: 10, width: 200, height: 200 }} />
                            </Grid>
                            <Typography color="textSecondary" gutterBottom>
                                Name: {currentUser.name}
                            </Typography>
                            <Typography color="textSecondary">
                                Login: {currentUser.login}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <form
                    onSubmit={(event) => this.handleSubmit(event)}
                    className="add-task-form"
                >
                    <TextField
                        style={{ margin: 0 }}
                        id="standard-name"
                        label="Task"
                        value={todo}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Add
                    </Button>
                </form>
                {hasError && (
                    <smal>Enter task</smal>
                )}
                <ul>
                    {currentUser.todos.map(todo => <TodoItem key={todo.id} todo={todo} selected={todo.selected} />)}
                </ul>
                <div style={viewshare}>
                    <span>Choose whom to share</span>
                    <FormControl style={{ width: 150 }}>
                        <Select
                            value={userLoginForshare}
                            onChange={this.handeleSelect}
                        >
                            {prepereUsers.map(item => <MenuItem value={item.login}>{item.login}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" disabled={!userLoginForshare} onClick={this.share}>
                        Share
                     </Button>
                </div>
            </>
        )
    }
}

export default TodosUser;