import { createContext, useContext } from 'react';

export const AuthContext = createContext();
export const AuthContextAdmin = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthAdmin() {
    return useContext(AuthContextAdmin);
}