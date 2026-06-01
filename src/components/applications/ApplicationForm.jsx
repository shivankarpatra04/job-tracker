import React, { useState } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea"; // If you're using shadcn/ui

const selectClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function ApplicationForm({ onSubmit, initialData = null }) {
    const [formData, setFormData] = useState({
        company: initialData?.company || '',
        position: initialData?.position || '',
        location: initialData?.location || '',
        status: initialData?.status || 'Applied',
        nextStep: initialData?.nextStep || 'Await response'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStepOptions = [
        'Await response',
        'Follow up',
        'Schedule interview',
        'Prepare for interview',
        'Complete assessment',
        'Submit documents',
        'Negotiate offer',
        'Background check',
        'Other'
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Company</label>
                    <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Acme Inc."
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Position</label>
                    <Input
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="e.g. Frontend Engineer"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Location</label>
                <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote · Bangalore"
                />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={selectClass}
                        required
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Next Step</label>
                    <select
                        name="nextStep"
                        value={formData.nextStep}
                        onChange={handleChange}
                        className={selectClass}
                    >
                        {nextStepOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {formData.nextStep === 'Other' && (
                        <Textarea
                            name="nextStep"
                            value={formData.nextStep === 'Other' ? '' : formData.nextStep}
                            onChange={handleChange}
                            placeholder="Describe the next step..."
                            className="mt-2"
                        />
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button type="submit">
                    {initialData ? 'Update Application' : 'Add Application'}
                </Button>
            </div>
        </form>
    );
}

export default ApplicationForm;
