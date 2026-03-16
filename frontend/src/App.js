import React, { useMemo } from 'react';
import './App.css';
import { Header } from './components/Header';
import { TodoFilters } from './components/TodoFilters';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { useLocalStorageState } from './hooks/useLocalStorageState';

/** @typedef {'all'|'active'|'completed'} Filter */

/**
 * @typedef {object} Todo
 * @property {string} id
 * @property {string} text
 * @property {boolean} completed
 */

/**
 * @return {string}
 */
function newId() {
    // Good-enough for a local-only app; avoids extra dependencies.
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * PUBLIC_INTERFACE
 * Main application component for a simple todo list.
 *
 * Features:
 * - add, toggle, delete
 * - filter (all/active/completed)
 * - localStorage persistence
 *
 * @return {JSX.Element}
 */
function App() {
    const [theme, setTheme] = useLocalStorageState('todo.theme', 'light');
    /** @type {[Todo[], function((Todo[]|function(Todo[]): Todo[])): void]} */
    const [todos, setTodos] = useLocalStorageState('todo.items', []);
    const [filter, setFilter] = useLocalStorageState('todo.filter', 'all');

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    /**
     * PUBLIC_INTERFACE
     */
    function toggleTheme() {
        setTheme((t) => (t === 'light' ? 'dark' : 'light'));
    }

    /**
     * PUBLIC_INTERFACE
     * @param {string} text
     */
    function addTodo(text) {
        setTodos((prev) => [{ id: newId(), text, completed: false }, ...prev]);
    }

    /**
     * PUBLIC_INTERFACE
     * @param {string} id
     */
    function toggleTodo(id) {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        );
    }

    /**
     * PUBLIC_INTERFACE
     * @param {string} id
     */
    function deleteTodo(id) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }

    const counts = useMemo(() => {
        const completed = todos.filter((t) => t.completed).length;
        const active = todos.length - completed;
        return { all: todos.length, active, completed };
    }, [todos]);

    const visibleTodos = useMemo(() => {
        /** @type {Record<Filter, function(Todo): boolean>} */
        const predicate = {
            all: () => true,
            active: (t) => !t.completed,
            completed: (t) => t.completed,
        };
        return todos.filter(predicate[filter]);
    }, [todos, filter]);

    return (
        <div className="App">
            <main className="container">
                <Header theme={theme} onToggleTheme={toggleTheme} />

                <section className="panel" aria-label="Todo entry">
                    <TodoInput onAdd={addTodo} />
                    <TodoFilters filter={filter} onChange={setFilter} counts={counts} />
                </section>

                <section className="panel" aria-label="Todo items">
                    <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
                </section>
            </main>
        </div>
    );
}

export default App;
