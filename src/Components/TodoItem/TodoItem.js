import React from 'react';
import './TodoItem.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Todoitem extends React.Component {
    state = {
        editedText: '',
        isEditing: false,
    };

    handleEditedText = ({ target: { value } }) => {
        this.setState({
            editedText: value.replace(/^\s+/, ''),
        });
    }

    activateEditing = (title) => {
        this.setState(({ isEditing }) => ({
            editedText: title,
            isEditing: !isEditing,
        }));
    }

    addNewText = (event) => {
        event.preventDefault();

        const { editTextTodo, todo: { id } } = this.props;
        const { editedText } = this.state;
        this.setState(({ isEditing }) => ({
            isEditing: !isEditing,
        }));

        editTextTodo(editedText, id);
    }

    handelCheck = event => {
        console.log(event)
        const { todo, selectTodo } = this.props
        const { target } = event;

        selectTodo(todo.id, target.checked)

    };

    render() {
        const { todo, deleteTodo, selected } = this.props;
        const { isEditing, editedText } = this.state;
        const viewStyle = {};
        const editStyle = {
            margin: 0,
            minWidth: 500,
            maxWidth: 750,
        };
    console.log(todo)
    if(isEditing) {
        viewStyle.display = 'none';
    } else {
    editStyle.display = 'none';
}

return (
    <li>
        <Paper style={viewStyle} className='list-item-form'>
            <Checkbox
                checked={selected}
                onChange={(event) => this.handelCheck(event, todo.id)}
                value="checkedB"
                color="primary"
                inputProps={{
                    'aria-label': 'secondary checkbox',
                }}
            />
            <Typography variant="h5" component="h3" onDoubleClick={() => this.activateEditing(todo.todoTitle)}>
                {todo.todoTitle}
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => deleteTodo(todo.id)} >
                Delete
                    </Button>
        </Paper>
        <form onSubmit={(event) => this.addNewText(event)}>
            <TextField
                style={editStyle}
                id="standard-name"
                label="Edit"
                value={editedText}
                onChange={(event) => this.handleEditedText(event)}
                margin="normal"
            />
        </form>
    </li>
)
    }
}
export default Todoitem;
