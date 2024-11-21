// components/interviews/InterviewList.jsx
import React, { useState } from 'react';
import { useInterviews } from '../../hooks/useInterviews';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { InterviewForm } from './InterviewForm';
import { InterviewActions } from './InterviewActions';

const statusColors = {
    Scheduled: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800"
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Delete Interview</h2>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete this interview? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={onConfirm}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export function InterviewList() {
    const [selectedStatus, setSelectedStatus] = useState('Scheduled');
    const { interviews, loading, error, scheduleInterview, updateInterview, deleteInterview } = useInterviews(selectedStatus);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [interviewToDelete, setInterviewToDelete] = useState(null);

    const handleSubmit = async (formData) => {
        try {
            console.log('Submitting interview data:', formData);
            if (selectedInterview) {
                await updateInterview(selectedInterview._id, formData);
            } else {
                await scheduleInterview(formData);
            }
            setShowForm(false);
            setSelectedInterview(null);
        } catch (err) {
            console.error('Error saving interview:', err);
        }
    };

    const handleEdit = (interview) => {
        setSelectedInterview(interview);
        setShowForm(true);
    };

    const handleDeleteClick = (interview) => {
        setInterviewToDelete(interview);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteInterview(interviewToDelete._id);
            setShowDeleteModal(false);
            setInterviewToDelete(null);
        } catch (err) {
            console.error('Error deleting interview:', err);
        }
    };

    const handleStatusUpdate = async (id, updateData) => {
        try {
            await updateInterview(id, updateData);
            // Interview list will update automatically via the hook
        } catch (err) {
            console.error('Error updating interview status:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Interviews</h2>
                    <p className="text-gray-600">
                        Manage your interviews
                    </p>
                </div>
                <Button onClick={() => {
                    setSelectedInterview(null);
                    setShowForm(true);
                }}>
                    <Plus className="mr-2 h-4 w-4" /> Schedule Interview
                </Button>
            </div>

            <div className="flex space-x-2 mb-4">
                <Button
                    variant={selectedStatus === 'Scheduled' ? "default" : "outline"}
                    onClick={() => setSelectedStatus('Scheduled')}
                >
                    Upcoming
                </Button>
                <Button
                    variant={selectedStatus === 'Completed' ? "default" : "outline"}
                    onClick={() => setSelectedStatus('Completed')}
                >
                    Completed
                </Button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    {selectedInterview ? 'Edit Interview' : 'Schedule Interview'}
                                </h2>
                                <Button
                                    onClick={() => setShowForm(false)}
                                    variant="ghost"
                                >
                                    ✕
                                </Button>
                            </div>
                            <InterviewForm
                                onSubmit={handleSubmit}
                                initialData={selectedInterview}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setInterviewToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
            />

            <Card>
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Company</th>
                                    <th className="text-left py-3 px-4">Position</th>
                                    <th className="text-left py-3 px-4">Date & Time</th>
                                    <th className="text-left py-3 px-4">Type</th>
                                    <th className="text-left py-3 px-4">Status</th>
                                    <th className="text-left py-3 px-4">Location</th>
                                    <th className="text-right py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {interviews && interviews.length > 0 ? (
                                    interviews
                                        .filter(interview => interview.status === selectedStatus)
                                        .map((interview) => (
                                            <tr key={interview._id} className="border-b">
                                                <td className="py-3 px-4 font-medium">
                                                    {interview.company || 'N/A'}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {interview.position || 'N/A'}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {new Date(interview.date).toLocaleDateString()}{' '}
                                                    {interview.time &&
                                                        new Date(`2000-01-01T${interview.time}`).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                </td>
                                                <td className="py-3 px-4">{interview.type}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-sm ${statusColors[interview.status]}`}>
                                                        {interview.status === 'Scheduled' ? 'Upcoming' : interview.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {interview.platform ? (
                                                        <span>{interview.platform} - {interview.location || 'N/A'}</span>
                                                    ) : (
                                                        interview.location || 'N/A'
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    {interview.status === 'Scheduled' && (
                                                        <InterviewActions
                                                            interview={interview}
                                                            onUpdateStatus={handleStatusUpdate}
                                                        />
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        className="mr-2"
                                                        onClick={() => handleEdit(interview)}
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => handleDeleteClick(interview)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-4 text-center text-gray-500">
                                            No {selectedStatus.toLowerCase()} interviews found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default InterviewList;