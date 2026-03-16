import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Small reusable button with variants.
 *
 * @param {{
 *   children: React.ReactNode,
 *   onClick?: function(): void,
 *   type?: 'button'|'submit'|'reset',
 *   variant?: 'primary'|'ghost'|'danger',
 *   size?: 'sm'|'md',
 *   ariaLabel?: string,
 *   disabled?: boolean,
 *   className?: string,
 * }} props
 * @return {JSX.Element}
 */
export function Button(props) {
    const {
        children,
        onClick,
        type = 'button',
        variant = 'primary',
        size = 'md',
        ariaLabel,
        disabled = false,
        className = '',
    } = props;

    const classes = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        disabled ? 'is-disabled' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            aria-label={ariaLabel}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
