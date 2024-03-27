import { useEffect, useReducer } from "react";
import todoReducer from "./todoReducer";

const initialState = [

    /*{
        id: new Date().getTime(),
        description: 'Recolectar la piedra del alma',
        done: false
    },
    {
        id: new Date().getTime() * 3,
        description: 'Recolectar la piedra del tiempo',
        done: false
    }*/
];
const init = () => {
    return JSON.parse(localStorage.getItem('todos') || []);
}

const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos])

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action);
    }
    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }
        dispatch(action);
    }
    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }
        dispatch(action);
    }
   


   
    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        todosCount : todos.length

    }
}

export default useTodos
