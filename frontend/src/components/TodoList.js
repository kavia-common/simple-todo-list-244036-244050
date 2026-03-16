import React from 'react';
import { Button } from './Button';

/**
 * @typedef {object} Todo
 * @property {string} id
 * @property {string} text
 * @property {boolean} completed
 */

/**
 * PUBLIC_INTERFACE
 * One row in the todo list.
 *
 * @param {{
 *   todo: Todo,
 *   onToggle: function(string): void,
 *   onDelete: function(string): void,
 * }} props
 * @return {JSX.Element}
 */
export function TodoItem(props) {
    const { todo, onToggle, onDelete } = props;

    return (
        <li className={`todo-item ${todo.completed ? 'is-completed' : ''}`}>
            <label className="todo-item__main">
                <input
                    className="todo-item__checkbox"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                />
                <span className="todo-item__text">{todo.text}</span>
            </label>

            <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(todo.id)}
                ariaLabel={`Delete "${todo.text}"`}
                className="todo-item__delete"
            >
                Delete
            </Button>
        </li>
    );
}

/**
 * PUBLIC_INTERFACE
 * List wrapper for todos.
 *
 * @param {{
 *   todos: Todo[],
 *   onToggle: function(string): void,
 *   onDelete: function(string): void,
 * }} props
 * @return {JSX.Element}
 */
export function TodoList(props) {
    const { todos, onToggle, onDelete } = props;

    if (!todos.length) {
        return <div className="empty">No todos here yet.</div>;
    }

    return (
        <ul className="todo-list" aria-label="Todo list">
            {todos.map((t) => (
                <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </ul>
    );
}
