import { createContext, useContext } from 'react';

export const AuthContext = createContext();
export const AuthContextAdmin = createContext();
export const AuthContextLogin = createContext();


export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthAdmin() {
    return useContext(AuthContextAdmin);
}

export function useAuthLogin() {
    return useContext(AuthContextLogin);
}