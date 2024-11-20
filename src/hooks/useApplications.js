import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useApplications = () => {
    const [applications, setApplications] = useState([]);  // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/applications`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Check if response.data.data exists, otherwise use empty array
            setApplications(response.data.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching applications:', err);
            setError(err.message);
            setApplications([]);  // Set to empty array on error
        } finally {
            setLoading(false);
        }
    };

    const addApplication = async (applicationData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/applications`, applicationData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setApplications(prev => [...prev, response.data.data]);
            return response.data.data;
        } catch (err) {
            console.error('Error adding application:', err);
            throw err;
        }
    };

    const updateApplication = async (id, applicationData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/applications/${id}`, applicationData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setApplications(prev =>
                prev.map(app => app._id === id ? response.data.data : app)
            );
            return response.data.data;
        } catch (err) {
            console.error('Error updating application:', err);
            throw err;
        }
    };

    const deleteApplication = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/applications/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setApplications(prev => prev.filter(app => app._id !== id));
        } catch (err) {
            console.error('Error deleting application:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return {
        applications,
        loading,
        error,
        addApplication,
        updateApplication,
        deleteApplication,
        refreshApplications: fetchApplications
    };
};