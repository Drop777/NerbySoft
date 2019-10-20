import { connect } from 'react-redux';
import TodoList from './TodoList';
import { addTodo, shareTodo, unselectTodo } from '../../store/index';

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    users: state.users,
});

const mapMethodsToProps = dispatch => ({
    addTodo: (todo) => dispatch(addTodo(todo)),
    shareTodo: (login, todo, fromUser) => dispatch(shareTodo(login, todo, fromUser)),
    unselectTodo: () => dispatch(unselectTodo())
});

const connectedTodosUser = connect (mapStateToProps, mapMethodsToProps)(TodoList);

export {
    connectedTodosUser as TodoList
}