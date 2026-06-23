'use client';

import { useState } from 'react';

interface VisitorData {
  name: string;
  phone: string;
  course: string;
}

interface VisitorFormProps {
  onFormSubmit?: (data: VisitorData) => void;
  autoFilledField?: string;
}

export default function VisitorForm({ onFormSubmit, autoFilledField }: VisitorFormProps) {
  const [formData, setFormData] = useState<VisitorData>({ name: '', phone: '', course: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.course) return;
    onFormSubmit?.(formData);
    setSubmitted(true);
  };

  const updateField = (field: keyof VisitorData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
        <p className="text-green-700 dark:text-green-300 font-medium">
          Thank you, {formData.name}! Your information has been submitted successfully.
        </p>
        <p className="text-green-600 dark:text-green-400 text-sm mt-1">
          We will contact you shortly regarding the {formData.course} course.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
        Visitor Information
      </h3>
      <div className="space-y-3">
        <Field
          label="Full Name"
          value={formData.name}
          onChange={(v) => updateField('name', v)}
          isHighlighted={autoFilledField === 'name'}
          placeholder="Speak or type your name"
        />
        <Field
          label="Phone Number"
          value={formData.phone}
          onChange={(v) => updateField('phone', v)}
          isHighlighted={autoFilledField === 'phone'}
          placeholder="Speak or type your phone number"
        />
        <Field
          label="Course Interest"
          value={formData.course}
          onChange={(v) => updateField('course', v)}
          isHighlighted={autoFilledField === 'course'}
          placeholder="e.g. Web Development, AI, Graphic Design"
        />
        <button
          onClick={handleSubmit}
          disabled={!formData.name || !formData.phone || !formData.course}
          className="w-full py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 
            dark:disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors
            disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  isHighlighted,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  isHighlighted?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors
          bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
          ${isHighlighted
            ? 'border-green-400 ring-2 ring-green-200 dark:ring-green-800'
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-400'
          }
          focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800`}
      />
    </div>
  );
}
