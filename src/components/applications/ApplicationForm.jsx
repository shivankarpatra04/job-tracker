import React, { useState } from 'react';
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea"; // If you're using shadcn/ui

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
        <Card>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Company</label>
                        <Input
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Enter company name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Position</label>
                        <Input
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="Enter job position"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Location</label>
                        <Input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter job location"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                    <div className="flex justify-end space-x-2">
                        <Button type="submit">
                            {initialData ? 'Update Application' : 'Add Application'}
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

export default ApplicationForm;