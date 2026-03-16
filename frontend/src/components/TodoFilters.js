import React from 'react';
import { Button } from './Button';

/** @typedef {'all'|'active'|'completed'} Filter */

/**
 * PUBLIC_INTERFACE
 * Filter controls for the todo list.
 *
 * @param {{
 *   filter: Filter,
 *   onChange: function(Filter): void,
 *   counts: { all: number, active: number, completed: number },
 * }} props
 * @return {JSX.Element}
 */
export function TodoFilters(props) {
    const { filter, onChange, counts } = props;

    return (
        <div className="filters" role="tablist" aria-label="Todo filters">
            <Button
                variant={filter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onChange('all')}
                ariaLabel="Show all todos"
            >
                All ({counts.all})
            </Button>
            <Button
                variant={filter === 'active' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onChange('active')}
                ariaLabel="Show active todos"
            >
                Active ({counts.active})
            </Button>
            <Button
                variant={filter === 'completed' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onChange('completed')}
                ariaLabel="Show completed todos"
            >
                Done ({counts.completed})
            </Button>
        </div>
    );
}
