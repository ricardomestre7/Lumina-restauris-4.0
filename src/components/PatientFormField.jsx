import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const PatientFormField = ({ name, label, type, value, onChange, placeholder, required, options, icon: Icon, min, max, className, labelClassName }) => {

  const fieldId = name; 

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Label htmlFor={fieldId} className={`text-sm font-medium text-foreground ${labelClassName || ''}`}>
        {label}
      </Label>
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
        {type === 'select' ? (
          <Select
            value={value}
            onValueChange={(currentValue) => onChange({ target: { name, value: currentValue }})} 
            required={required}
            name={name}
          >
            <SelectTrigger id={fieldId} className={`w-full ${Icon ? 'pl-10' : ''} h-10 text-sm rounded-md shadow-sm border-input bg-background focus:ring-2 focus:ring-ring ${className || ''}`}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options && options.map(option => (
                <SelectItem key={option.value} value={option.value} className="text-sm">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id={fieldId}
            name={name}
            type={type}
            placeholder={placeholder}
            className={`${Icon ? 'pl-10' : ''} h-10 text-sm rounded-md shadow-sm border-input bg-background focus:ring-2 focus:ring-ring ${className || ''}`}
            value={value}
            onChange={onChange}
            required={required}
            min={min}
            max={max}
          />
        )}
      </div>
    </motion.div>
  );
};

export default PatientFormField;