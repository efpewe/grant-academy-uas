import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

interface FormGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

export default ({label, name, error, className = '', ...inputProps }: FormGroupProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input 
        id={name} 
        name={name} 
        hasError={!!error} 
        {...inputProps} 
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}