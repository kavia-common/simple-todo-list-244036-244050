import { useEffect, useState } from 'react';

/**
 * @typedef {object} LocalStorageStateOptions
 * @property {(value: any) => any=} reviver Optional parser/reviver after JSON parse.
 * @property {(value: any) => any=} replacer Optional transformer before JSON stringify.
 */

/**
 * PUBLIC_INTERFACE
 * A small hook to keep a piece of state persisted to localStorage.
 *
 * @template T
 * @param {string} key localStorage key.
 * @param {T|(() => T)} initialValue Initial value or initializer function.
 * @param {LocalStorageStateOptions=} options Optional parse/stringify transforms.
 * @return {[T, function(T|function(T):T): void]} [value, setValue]
 */
export function useLocalStorageState(key, initialValue, options = {}) {
    const { reviver, replacer } = options;

    const [value, setValue] = useState(() => {
        try {
            const raw = window.localStorage.getItem(key);
            if (raw === null) {
                return typeof initialValue === 'function' ? initialValue() : initialValue;
            }
            const parsed = JSON.parse(raw);
            return reviver ? reviver(parsed) : parsed;
        } catch (err) {
            // If localStorage is blocked/corrupted, fall back to in-memory state.
            return typeof initialValue === 'function' ? initialValue() : initialValue;
        }
    });

    useEffect(() => {
        try {
            const toStore = replacer ? replacer(value) : value;
            window.localStorage.setItem(key, JSON.stringify(toStore));
        } catch (err) {
            // Ignore write errors (quota exceeded, blocked, etc).
        }
    }, [key, value, replacer]);

    return [value, setValue];
}
