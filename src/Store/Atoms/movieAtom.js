import { atom } from "recoil";

export const movieDataState = atom({
    key: 'movieDataState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});