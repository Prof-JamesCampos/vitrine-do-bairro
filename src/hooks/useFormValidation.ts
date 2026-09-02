import { useState } from 'react';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    patternMessage?: string;
  };
}

interface FormValues {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (values: FormValues) => {
    const newErrors: { [key: string]: string } = {};

    for (const key in rules) {
      const value = values[key];
      const rule = rules[key];

      if (rule.required && !value) {
        newErrors[key] = 'Este campo é obrigatório';
      } else if (rule.minLength && value.length < rule.minLength) {
        newErrors[key] = `Mínimo de ${rule.minLength} caracteres`;
      } else if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[key] = rule.patternMessage || 'Formato inválido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => setErrors({});

  return { errors, validate, clearErrors };
};