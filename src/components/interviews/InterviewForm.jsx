// components/interviews/InterviewForm.jsx
import React, { useState } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { useApplications } from '../../hooks/useApplications';

const selectClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function InterviewForm({ onSubmit, initialData = null, onCancel }) {
    const { applications, loading: applicationsLoading } = useApplications();

    const [formData, setFormData] = useState({
        application: initialData?.application?._id || '',
        company: initialData?.application?.company || '',
        position: initialData?.application?.position || '',
        type: initialData?.type || '',
        date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
        time: initialData?.time || '',
        platform: initialData?.platform || '',
        location: initialData?.location || '',
        notes: initialData?.notes || '',
        status: initialData?.status || 'Scheduled'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const dateTime = `${formData.date}T${formData.time || '00:00'}`;
        const submissionData = {
            ...formData,
            date: new Date(dateTime).toISOString()
        };
        onSubmit(submissionData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (applicationsLoading) {
        return (
            <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading applications…
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Application Select */}
            <div className="space-y-2">
                <label className="block text-sm font-medium">Application</label>
                <select
                    name="application"
                    value={formData.application}
                    onChange={handleChange}
                    className={selectClass}
                    required
                >
                    <option value="">Select application</option>
                    {applications?.map(app => (
                        <option key={app._id} value={app._id}>
                            {app.company} - {app.position}
                        </option>
                    ))}
                </select>
            </div>

            {/* Type Select */}
            <div className="space-y-2">
                <label className="block text-sm font-medium">Interview Type</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={selectClass}
                    required
                >
                    <option value="">Select type</option>
                    <option value="Technical">Technical</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="HR">HR</option>
                    <option value="System Design">System Design</option>
                    <option value="Cultural Fit">Cultural Fit</option>
                </select>
            </div>

            {/* Date and Time */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Date</label>
                    <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            name="date"
                            type="date"
                            className="pl-10"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Time</label>
                    <div className="relative">
                        <Clock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            name="time"
                            type="time"
                            className="pl-10"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Platform and Location */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Platform</label>
                    <select
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                        className={selectClass}
                    >
                        <option value="">Select platform</option>
                        <option value="Zoom">Zoom</option>
                        <option value="Google Meet">Google Meet</option>
                        <option value="Microsoft Teams">Microsoft Teams</option>
                        <option value="Skype">Skype</option>
                        <option value="On-site">On-site</option>
                        <option value="Phone">Phone</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Location/Link</label>
                    <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Meeting link or address"
                    />
                </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <label className="block text-sm font-medium">Notes</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add any notes about the interview…"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-2">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button type="submit">
                    {initialData ? 'Update Interview' : 'Schedule Interview'}
                </Button>
            </div>
        </form>
    );
}
