import { createContext, useContext } from 'react';

export const AuthContextClient = createContext();
export const AuthContextAdmin = createContext();
export const AuthContextLogin = createContext();


export function useAuthClient() {
    return useContext(AuthContextClient);
}

export function useAuthAdmin() {
    return useContext(AuthContextAdmin);
}

export function useAuthLogin() {
    return useContext(AuthContextLogin);
}