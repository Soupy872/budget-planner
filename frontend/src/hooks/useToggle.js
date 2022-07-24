import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initialValue) => {
    const [storedValue, setValue] = useLocalStorage(key, initialValue);

    const toggle = (value) => {
        setValue(prev => {
            return typeof value === 'boolean' ? value : !prev;
        })
    }

    return [storedValue, toggle];
}

export default useToggle;