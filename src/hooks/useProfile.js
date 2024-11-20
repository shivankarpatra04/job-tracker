// hooks/useProfile.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useProfile = () => {
    const [profileData, setProfileData] = useState({
        personal: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            location: ''
        },
        professional: {
            title: '',
            bio: '',
            skills: [],
            portfolio: '',
            linkedin: '',
            github: ''
        }
    });

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch profile data
    const fetchProfileData = async () => {
        try {
            const token = localStorage.getItem('token');
            const [profileRes, applicationsRes] = await Promise.all([
                axios.get(`${API_URL}/profile/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${API_URL}/profile/applications`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setProfileData(profileRes.data.data);
            setApplications(applicationsRes.data.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching profile data:', err);
            setError(err.message || 'Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    // Update personal information
    const updatePersonalInfo = async (personalInfo) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/profile/personal`, personalInfo, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfileData(prev => ({
                ...prev,
                personal: response.data.data
            }));

            return { success: true };
        } catch (err) {
            console.error('Error updating personal info:', err);
            throw err;
        }
    };

    // Update professional information
    const updateProfessional = async (professionalInfo) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/profile/professional`, professionalInfo, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfileData(prev => ({
                ...prev,
                professional: response.data.data
            }));

            return { success: true };
        } catch (err) {
            console.error('Error updating professional info:', err);
            throw err;
        }
    };

    // Add skill
    const addSkill = async (skill) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/profile/skills`, { skill }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfileData(prev => ({
                ...prev,
                professional: {
                    ...prev.professional,
                    skills: response.data.data.skills
                }
            }));

            return { success: true };
        } catch (err) {
            console.error('Error adding skill:', err);
            throw err;
        }
    };

    // Remove skill
    const removeSkill = async (skill) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${API_URL}/profile/skills/${skill}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfileData(prev => ({
                ...prev,
                professional: {
                    ...prev.professional,
                    skills: response.data.data.skills
                }
            }));

            return { success: true };
        } catch (err) {
            console.error('Error removing skill:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    return {
        profileData,
        applications,
        loading,
        error,
        updatePersonalInfo,
        updateProfessional,
        addSkill,
        removeSkill,
        refreshProfile: fetchProfileData
    };
};