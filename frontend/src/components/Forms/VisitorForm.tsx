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
      <div style={{ backgroundColor: 'rgba(0, 212, 170, 0.1)', border: '1px solid #00d4aa' }} className="rounded-xl p-4 text-center">
        <p style={{ color: '#00d4aa' }} className="font-medium">
          Thank you, {formData.name}! Your information has been submitted successfully.
        </p>
        <p style={{ color: '#8892b0' }} className="text-sm mt-1">
          We will contact you shortly regarding the {formData.course} course.
        </p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#141738', borderColor: '#1e2248' }} className="rounded-xl p-4 shadow-sm border">
      <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: '#8892b0' }}>
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
          className="w-full py-2.5 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
          style={{
            backgroundColor: formData.name && formData.phone && formData.course ? '#00d4aa' : '#2a2f5a',
            opacity: formData.name && formData.phone && formData.course ? 1 : 0.5,
          }}
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
      <label className="block text-xs mb-1" style={{ color: '#8892b0' }}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          backgroundColor: '#111438',
          color: '#ffffff',
          borderColor: isHighlighted ? '#00d4aa' : '#1e2248',
          outline: isHighlighted ? '2px solid rgba(0, 212, 170, 0.3)' : 'none',
        }}
        className="w-full px-3 py-2 rounded-lg border text-sm transition-colors focus:outline-none"
        onFocus={(e) => { e.currentTarget.style.borderColor = '#4a9eff'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = isHighlighted ? '#00d4aa' : '#1e2248'; }}
      />
    </div>
  );
}
