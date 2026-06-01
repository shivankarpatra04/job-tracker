// components/interviews/InterviewList.jsx
import React, { useState } from 'react';
import { useInterviews } from '../../hooks/useInterviews';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Plus, Edit2, Trash2, X, AlertTriangle, Calendar, MapPin, Video } from 'lucide-react';
import { InterviewForm } from './InterviewForm';
import { InterviewActions } from './InterviewActions';
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
                        <h2 className="text-lg font-semibold">Delete interview</h2>
                    </div>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Are you sure you want to delete this interview? This action cannot be undone.
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

export function InterviewList() {
    const [selectedStatus, setSelectedStatus] = useState('Scheduled');
    const { interviews, loading, error, scheduleInterview, updateInterview, deleteInterview } = useInterviews(selectedStatus);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [interviewToDelete, setInterviewToDelete] = useState(null);

    const handleSubmit = async (formData) => {
        try {
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
        } catch (err) {
            console.error('Error updating interview status:', err);
        }
    };

    const visibleInterviews = (interviews || []).filter(
        (interview) => interview.status === selectedStatus
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Interviews</h1>
                    <p className="mt-1 text-muted-foreground">Schedule and track your upcoming and past interviews</p>
                </div>
                <Button onClick={() => { setSelectedInterview(null); setShowForm(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Schedule Interview
                </Button>
            </div>

            {/* Status segmented control */}
            <div className="inline-flex rounded-lg border bg-muted/50 p-1">
                {['Scheduled', 'Completed'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 ${selectedStatus === status
                            ? 'bg-card text-foreground shadow-soft'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {status === 'Scheduled' ? 'Upcoming' : 'Completed'}
                    </button>
                ))}
            </div>

            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
                    onClick={() => setShowForm(false)}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-2xl animate-scale-in overflow-y-auto rounded-xl bg-card shadow-card-hover"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b p-5">
                            <h2 className="text-lg font-semibold">
                                {selectedInterview ? 'Edit Interview' : 'Schedule Interview'}
                            </h2>
                            <Button onClick={() => setShowForm(false)} variant="ghost" size="icon" aria-label="Close">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-5">
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

            {error ? (
                <Card className="p-6 text-center text-rose-600">Error: {error}</Card>
            ) : loading ? (
                <Card className="p-6">
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                </Card>
            ) : visibleInterviews.length === 0 ? (
                <Card className="animate-fade-up">
                    <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Calendar className="h-7 w-7" />
                        </span>
                        <div>
                            <h3 className="text-lg font-semibold">
                                No {selectedStatus === 'Scheduled' ? 'upcoming' : 'completed'} interviews
                            </h3>
                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                {selectedStatus === 'Scheduled'
                                    ? 'Schedule an interview to keep track of your conversations.'
                                    : 'Completed interviews will show up here.'}
                            </p>
                        </div>
                        {selectedStatus === 'Scheduled' && (
                            <Button onClick={() => { setSelectedInterview(null); setShowForm(true); }}>
                                <Plus className="mr-2 h-4 w-4" /> Schedule Interview
                            </Button>
                        )}
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
                                    <th className="px-4 py-3">Date &amp; Time</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Location</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {visibleInterviews.map((interview) => (
                                    <tr key={interview._id} className="transition-colors hover:bg-muted/40">
                                        <td className="px-4 py-3 font-medium">
                                            {interview.application?.company || 'N/A'}
                                        </td>
                                        <td className="px-4 py-3">
                                            {interview.application?.position || 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 tabular-nums text-muted-foreground">
                                            {new Date(interview.date).toLocaleDateString()}{' '}
                                            {interview.time &&
                                                new Date(`2000-01-01T${interview.time}`).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                        </td>
                                        <td className="px-4 py-3">{interview.type}</td>
                                        <td className="px-4 py-3">
                                            <span className={statusPill(interview.status)}>
                                                {interview.status === 'Scheduled' ? 'Upcoming' : interview.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            <span className="flex items-center gap-1.5">
                                                {interview.platform ? (
                                                    <>
                                                        <Video className="h-3.5 w-3.5" />
                                                        {interview.platform}{interview.location ? ` · ${interview.location}` : ''}
                                                    </>
                                                ) : interview.location ? (
                                                    <>
                                                        <MapPin className="h-3.5 w-3.5" />
                                                        {interview.location}
                                                    </>
                                                ) : 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                {interview.status === 'Scheduled' && (
                                                    <InterviewActions
                                                        interview={interview}
                                                        onUpdateStatus={handleStatusUpdate}
                                                    />
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label="Edit interview"
                                                    onClick={() => handleEdit(interview)}
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label="Delete interview"
                                                    className="text-muted-foreground hover:text-destructive"
                                                    onClick={() => handleDeleteClick(interview)}
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

export default InterviewList;
