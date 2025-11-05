import React from 'react';

interface ProgressBarProps {
    progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Progress</span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <div
                    className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};