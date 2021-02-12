import { debounce } from "lodash";

/**
 * HOF which takes a function (the callback) and returns a debounced function which handles the
 * onChange event of a TextField and extracts the newValue, in turn calling the callback with
 * the new value.
 *
 * @example
 *  return <TextField onChange={debouncedChangeHandler((newName) => console.log(newName))} />
 *
 * @param callback {function(string): void} Invoked after debounce
 * @param wait {number} debounce wait in ms
 * @returns Debounced onChange handler
 */
export const debouncedChangeHandler = (callback, wait = 500) =>
  debounce((_, newValue) => callback(newValue), wait);
