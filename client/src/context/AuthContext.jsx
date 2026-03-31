import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Configure axios to always send cookies
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            console.log("AuthProvider: Checking login status at:", import.meta.env.VITE_API_URL);
            try {
                if (!import.meta.env.VITE_API_URL) {
                    throw new Error("VITE_API_URL is not defined! Check your Vercel/Local env settings.");
                }
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`);
                console.log("AuthProvider: Success, user found.");
                setUser(data);
            } catch (error) {
                console.error("AuthProvider: Auth check failed or no session found.", error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                email,
                password,
            });
            // Server sets the refreshToken cookie
            setUser(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed',
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
                name,
                email,
                password,
            });
            // Server sets the refreshToken cookie
            setUser(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed',
            };
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
