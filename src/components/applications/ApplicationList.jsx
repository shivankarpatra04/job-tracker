// components/applications/ApplicationList.jsx
import React, { useState } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Plus, Edit2, Trash2, X, AlertTriangle, Briefcase, FileText } from 'lucide-react';
import ApplicationForm from './ApplicationForm';
import { statusPill } from "../../lib/status";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <Card className="w-full max-w-md animate-scale-in" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                            <AlertTriangle className="h-5 w-5" />
                        </span>
                        <h2 className="text-lg font-semibold">Delete application</h2>
                    </div>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Are you sure you want to delete this application? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button variant="destructive" onClick={onConfirm}>Delete</Button>
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Applications</h1>
                    <p className="mt-1 text-muted-foreground">Track and manage every job you've applied to</p>
                </div>
                <Button onClick={handleAddNew} className="sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> New Application
                </Button>
            </div>

            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
                    onClick={handleCloseForm}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-2xl animate-scale-in overflow-y-auto rounded-xl bg-card shadow-card-hover"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b p-5">
                            <h2 className="text-lg font-semibold">
                                {isEditing ? 'Edit Application' : 'New Application'}
                            </h2>
                            <Button onClick={handleCloseForm} variant="ghost" size="icon" aria-label="Close">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-5">
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

            {error ? (
                <Card className="p-6 text-center text-rose-600">Error: {error}</Card>
            ) : loading ? (
                <Card className="p-6">
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                </Card>
            ) : applications.length === 0 ? (
                <Card className="animate-fade-up">
                    <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Briefcase className="h-7 w-7" />
                        </span>
                        <div>
                            <h3 className="text-lg font-semibold">No applications yet</h3>
                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                Add your first job application to start tracking your progress.
                            </p>
                        </div>
                        <Button onClick={handleAddNew}>
                            <Plus className="mr-2 h-4 w-4" /> Add your first application
                        </Button>
                    </div>
                </Card>
            ) : (
                <Card className="animate-fade-up overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    <th className="px-4 py-3">Company</th>
                                    <th className="px-4 py-3">Position</th>
                                    <th className="px-4 py-3">Location</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Next Step</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {applications.map((application) => (
                                    <tr
                                        key={application._id}
                                        className="transition-colors hover:bg-muted/40"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                {application.company}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{application.position}</td>
                                        <td className="px-4 py-3 text-muted-foreground">{application.location || '—'}</td>
                                        <td className="px-4 py-3">
                                            <span className={statusPill(application.status)}>
                                                {application.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">{application.nextStep || '—'}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label={`Edit application at ${application.company}`}
                                                    onClick={() => handleEdit(application)}
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label={`Delete application at ${application.company}`}
                                                    className="text-muted-foreground hover:text-destructive"
                                                    onClick={() => handleDeleteClick(application)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
}

export default ApplicationList;
