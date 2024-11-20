// components/applications/ApplicationList.jsx
import React, { useState } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Edit2, Trash2 } from 'lucide-react';
import ApplicationForm from './ApplicationForm';

const statusColors = {
    Applied: "bg-blue-100 text-blue-800",
    Interview: "bg-yellow-100 text-yellow-800",
    Offer: "bg-green-100 text-green-800",
    Accepted: "bg-purple-100 text-purple-800",
    Rejected: "bg-red-100 text-red-800"
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Delete Application</h2>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete this application? This action cannot be undone.
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

export function ApplicationList() {
    const { applications, loading, error, addApplication, updateApplication, deleteApplication } = useApplications();
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [applicationToDelete, setApplicationToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = async (formData) => {
        try {
            if (isEditing && selectedApplication) {
                await updateApplication(selectedApplication._id, formData);
                setIsEditing(false);
            } else {
                await addApplication(formData);
            }
            setShowForm(false);
            setSelectedApplication(null);
        } catch (err) {
            console.error('Error saving application:', err);
            alert('Error saving application. Please try again.');
        }
    };

    const handleEdit = (application) => {
        setSelectedApplication(application);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDeleteClick = (application) => {
        setApplicationToDelete(application);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteApplication(applicationToDelete._id);
            setShowDeleteModal(false);
            setApplicationToDelete(null);
        } catch (err) {
            console.error('Error deleting application:', err);
            alert('Error deleting application. Please try again.');
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedApplication(null);
        setIsEditing(false);
    };

    const handleAddNew = () => {
        setSelectedApplication(null);
        setIsEditing(false);
        setShowForm(true);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Job Applications</h2>
                    <p className="text-gray-600">
                        Track and manage your job applications
                    </p>
                </div>
                <Button onClick={handleAddNew}>
                    <Plus className="mr-2 h-4 w-4" /> New Application
                </Button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    {isEditing ? 'Edit Application' : 'New Application'}
                                </h2>
                                <Button
                                    onClick={handleCloseForm}
                                    variant="ghost"
                                >
                                    ✕
                                </Button>
                            </div>
                            <ApplicationForm
                                onSubmit={handleSubmit}
                                initialData={selectedApplication}
                                isEditing={isEditing}
                            />
                        </div>
                    </div>
                </div>
            )}

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setApplicationToDelete(null);
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
                                    <th className="text-left py-3 px-4">Location</th>
                                    <th className="text-left py-3 px-4">Status</th>
                                    <th className="text-left py-3 px-4">Next Step</th>
                                    <th className="text-right py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application) => (
                                    <tr key={application._id} className="border-b">
                                        <td className="py-3 px-4 font-medium">{application.company}</td>
                                        <td className="py-3 px-4">{application.position}</td>
                                        <td className="py-3 px-4">{application.location}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-sm ${statusColors[application.status]}`}>
                                                {application.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">{application.nextStep}</td>
                                        <td className="py-3 px-4 text-right">
                                            <Button
                                                variant="ghost"
                                                className="mr-2"
                                                onClick={() => handleEdit(application)}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleDeleteClick(application)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {applications.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-4 text-center text-gray-500">
                                            No applications found. Add your first application!
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

export default ApplicationList;