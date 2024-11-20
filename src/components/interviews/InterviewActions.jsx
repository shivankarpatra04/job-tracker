// components/interviews/InterviewActions.jsx
import React from 'react';
import { Button } from "../ui/button";
import { CheckCircle } from 'lucide-react';

export function InterviewActions({ interview, onUpdateStatus }) {
    if (interview.status === 'Completed') {
        return <span className="text-green-500">Completed</span>;
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateStatus(interview._id, { status: 'Completed' })}
            className="text-green-600 hover:text-green-700"
        >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Complete
        </Button>
    );
}