import React from 'react';
import { Button } from './Button';

/**
 * PUBLIC_INTERFACE
 * App header with title and theme toggle.
 *
 * @param {{
 *   theme: 'light'|'dark',
 *   onToggleTheme: function(): void,
 * }} props
 * @return {JSX.Element}
 */
export function Header(props) {
    const { theme, onToggleTheme } = props;

    return (
        <header className="app-header">
            <div className="app-header__title">
                <h1 className="title">Todo Arcade</h1>
                <p className="subtitle">A tiny, fast todo list with local persistence.</p>
            </div>

            <Button
                className="theme-toggle"
                variant="ghost"
                size="sm"
                onClick={onToggleTheme}
                ariaLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
        </header>
    );
}
