import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const useInterviews = (status = 'Upcoming') => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInterviews = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/interviews?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setInterviews(response.data.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching interviews:', err);
            setError(err.message);
            setInterviews([]);
        } finally {
            setLoading(false);
        }
    }, [status]);

    const scheduleInterview = async (interviewData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/interviews`, interviewData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setInterviews(prev => [...prev, response.data.data]);
            return response.data.data;
        } catch (err) {
            console.error('Error scheduling interview:', err);
            throw err;
        }
    };

    const updateInterview = async (id, interviewData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/interviews/${id}`, interviewData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setInterviews(prev =>
                prev.map(interview => interview._id === id ? response.data.data : interview)
            );
            return response.data.data;
        } catch (err) {
            console.error('Error updating interview:', err);
            throw err;
        }
    };

    const deleteInterview = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/interviews/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setInterviews(prev => prev.filter(interview => interview._id !== id));
        } catch (err) {
            console.error('Error deleting interview:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchInterviews();
    }, [fetchInterviews]);

    return {
        interviews,
        loading,
        error,
        scheduleInterview,
        updateInterview,
        deleteInterview,
        refreshInterviews: fetchInterviews
    };
};