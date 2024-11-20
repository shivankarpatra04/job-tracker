// components/interviews/InterviewForm.jsx
import React, { useState, useEffect } from 'react';
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar, Clock } from 'lucide-react';
import { useApplications } from '../../hooks/useApplications';

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
        // Combine date and time for the API
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
        return <div>Loading applications...</div>;
    }

    return (
        <Card>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Application Select */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Application</label>
                        <select
                            name="application"
                            value={formData.application}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        >
                            <option value="">Select Application</option>
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
                            className="w-full p-2 border rounded-md"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Technical">Technical</option>
                            <option value="Behavioral">Behavioral</option>
                            <option value="HR">HR</option>
                            <option value="System Design">System Design</option>
                            <option value="Cultural Fit">Cultural Fit</option>
                        </select>
                    </div>

                    {/* Date and Time */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
                                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Platform</label>
                            <select
                                name="platform"
                                value={formData.platform}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select Platform</option>
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
                                placeholder="Enter meeting link or location"
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
                            placeholder="Add any notes about the interview..."
                            className="w-full p-2 min-h-[100px] border rounded-md"
                        />
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-2">
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
            </div>
        </Card>
    );
}