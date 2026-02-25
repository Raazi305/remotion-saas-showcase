// BaseInput - Mock input component for UI demonstrations
import React from 'react';

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    error?: string;
    helperText?: string;
    containerClassName?: string;
}

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
    ({
        label,
        error,
        helperText,
        className = '',
        containerClassName = '',
        id,
        ...props
    }, ref) => {
        const inputId = id || props.name || Math.random().toString(36).substr(2, 9);

        return (
            <div className={`w-full ${containerClassName}`}>
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-bold text-gray-700 mb-1">
                        {label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
                            appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base transition-colors
                            ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900'}
                            ${props.disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}
                            ${className}
                        `}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`}>
                        {error}
                    </p>
                )}
                {!error && helperText && (
                    <p className="mt-1 text-sm text-gray-500">
                        {helperText}
                    </p>
                )}
            </div>
        );
    },
);
