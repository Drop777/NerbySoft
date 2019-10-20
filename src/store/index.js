import { createStore } from 'redux';

const ACTION_TYPES = {
    REGISTER_USER: 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER',
    ADD_TODO: 'ADD_TODO',
    DELETE_TODO: 'DELETE_TODO',
    ADD_EDIT_TEXT: 'ADD_EDIT_TEXT',
    SELECT_TODO: 'SELECT_TODO',
    SHARE_TODO: 'SHARE_TODO',
    UNSELECT_TODO: 'UNSELECT_TODO',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

export const register = (newLogin, newPass, newName) => {
    const user = {
        name: newName,
        login: newLogin,
        password: newPass,
        todos: [],
    };

    return ({
        type: 'REGISTER_USER',
        payload: {...user},
    })
    
}

export const login = (login, password) => (
    {
        type: 'LOGIN_USER',
        payload: {
            userLogin: login,
            userPassword: password,
        },
    }
);

export const addTodo = todo => (
    {
        type: 'ADD_TODO',
        payload: todo,
    }
);

export const deleteTodo = todoId => (
    {
        type: 'DELETE_TODO',
        payload: todoId,
    }
);

export const editTextTodo = (editedText, id) => (
    {
        type: 'ADD_EDIT_TEXT',
        payload: {
            id,
            editedText
        }
    }
);

export const selectTodo = (id, checked) => (
    {
        type: 'SELECT_TODO',
        payload: {
            id,
            checked
        }
    }
);

export const unselectTodo = () => (
    {
        type: 'UNSELECT_TODO',
    }
);

export const handleLogin = () => (
    {
        type: 'LOGIN',
    }
)

export const handleLogout = () => (
    {
        type: 'LOGOUT',
    }
)

export const shareTodo = (login, todo, fromUser) => {
    const preperedTodo = todo.map(item => (
        {
            ...item,
            todoTitle: item.todoTitle + ' shared from ' + fromUser,
            selected: false,
        }
    ));

    return  ({
        type: 'SHARE_TODO',
        payload: {
            login,
            preperedTodo
        }
    })
};


const initialState = localStorage['redux-store'] 
    ? JSON.parse(localStorage['redux-store']) 
    : {
        users: [],
        currentUser: {},
         isLogged: false,
    }

const reducer = (state = initialState, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case ACTION_TYPES.REGISTER_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case ACTION_TYPES.LOGIN_USER:
            return {
                ...state,
                currentUser: state.users.find(user => user.login === action.payload.userLogin && user.password === action.payload.userPassword),
            }
        case ACTION_TYPES.ADD_TODO:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    todos: [...state.currentUser.todos, action.payload]
                },
                users: [...state.users].map(user => {
                    if (user.name === state.currentUser.name) {
                        user.todos = [...user.todos, action.payload]
                    }
                    return user;
                }),
            }
        case ACTION_TYPES.DELETE_TODO: {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    todos: [...state.currentUser.todos].filter(todo => todo.id !== action.payload)
                },
                users: [...state.users].map(user => {
                    if (user.name === state.currentUser.name) {
                        user.todos = [...user.todos].filter(todo => todo.id !== action.payload)
                    }
                    return user;
                }),
            }
        }
        case ACTION_TYPES.ADD_EDIT_TEXT: {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    todos: [...state.currentUser.todos].map(todo => {
                        if (todo.id === action.payload.id) {
                            todo.todoTitle = action.payload.editedText
                        }
                        return todo;
                    })
                },
            }
        }
        case ACTION_TYPES.SELECT_TODO: 
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    todos: [...state.currentUser.todos].map(todo => {
                        if (todo.id === action.payload.id) {
                            todo.selected = action.payload.checked
                        }
                        return todo;
                    })
                }
            }
        case ACTION_TYPES.UNSELECT_TODO: 
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    todos: [...state.currentUser.todos].map(item => (
                        {
                            ...item,
                            selected: false,
                        }
                    ))
                },
                users: [...state.users].map(user => {
                    if (user.name === state.currentUser.name) {
                      return (
                          {
                                ...user,
                                todos: [...user.todos].map(todo => (
                                    {
                                        ...todo,
                                        selected: false,
                                    }
                                ))
                          }
                      );
                    }
                    return user;
                }),
            }
        case ACTION_TYPES.SHARE_TODO: 
            return {
                ...state,
                users: [...state.users].map(user => {
                    if (user.login === action.payload.login) {
                        user.todos = [...user.todos, ...action.payload.preperedTodo]
                    }
                    return user;
                }),
            }
        case ACTION_TYPES.LOGIN: {
            return {
                ...state,
                 isLogged: true,
            }
        }
        case ACTION_TYPES.LOGOUT: {
            return {
                ...state,
                 isLogged: false,
            }
        }
        default: 
            return state;
    }
    
};

const store = createStore(reducer);

store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify(store.getState());
})

export default store;