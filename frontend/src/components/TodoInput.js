import React, { useMemo, useState } from 'react';
import { Button } from './Button';

/**
 * PUBLIC_INTERFACE
 * Input form for adding a new todo.
 *
 * @param {{
 *   onAdd: function(string): void,
 * }} props
 * @return {JSX.Element}
 */
export function TodoInput(props) {
    const { onAdd } = props;
    const [text, setText] = useState('');
    const [touched, setTouched] = useState(false);

    const trimmed = useMemo(() => text.trim(), [text]);
    const isValid = trimmed.length > 0;

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    function handleSubmit(e) {
        e.preventDefault();
        setTouched(true);

        if (!isValid) {
            return;
        }

        onAdd(trimmed);
        setText('');
        setTouched(false);
    }

    return (
        <form className="todo-input" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="new-todo">
                Add a todo
            </label>
            <input
                id="new-todo"
                className="todo-input__field"
                type="text"
                value={text}
                placeholder="Add a task…"
                onChange={(e) => setText(e.target.value)}
                onBlur={() => setTouched(true)}
                autoComplete="off"
            />
            <Button type="submit" variant="primary" ariaLabel="Add todo" disabled={!isValid}>
                Add
            </Button>

            {touched && !isValid ? (
                <div className="todo-input__error" role="alert">
                    Please enter a todo.
                </div>
            ) : null}
        </form>
    );
}
