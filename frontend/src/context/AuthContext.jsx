import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const token = localStorage.getItem('userToken');
            if (token) {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, config);
                    setUser(data);
                } catch (error) {
                    console.error("Token verification failed:", error);
                    localStorage.removeItem('userToken');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });
            localStorage.setItem('userToken', data.token);
            setUser(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, userData);
            localStorage.setItem('userToken', data.token);
            setUser(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        setUser(null);
    };

    const updateProfile = async (profileData) => {
        try {
            const token = localStorage.getItem('userToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, profileData, config);
            if (data.token) {
                localStorage.setItem('userToken', data.token);
            }
            setUser(data);
            return { success: true, user: data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Update failed'
            };
        }
    };

    const value = {
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
