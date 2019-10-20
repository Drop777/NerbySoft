import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { deleteTodo, editTextTodo, selectTodo } from '../../store/index';

const mapMethodsToProps = dispatch => ({
    deleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
    editTextTodo: (editText, id) => dispatch(editTextTodo(editText, id)),
    selectTodo: (id, checked) => dispatch(selectTodo(id, checked)),
});

const connectedTodoItem = connect (null, mapMethodsToProps)(TodoItem);

export {
    connectedTodoItem as TodoItem
}