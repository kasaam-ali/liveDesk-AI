export const VisitorSchema = {
  id: { type: 'string', description: 'Unique visitor identifier (timestamp-based)' },
  name: { type: 'string', required: true, description: 'Full name of the visitor' },
  phone: { type: 'string', required: true, description: 'Contact phone number' },
  course: { type: 'string', required: true, description: 'Course of interest' },
  purpose: {
    type: 'string',
    enum: ['admission inquiry', 'appointment', 'general information'],
    description: 'Purpose of visit',
  },
  visitTime: { type: 'string', description: 'ISO timestamp of the visit' },
  language: { type: 'string', enum: ['urdu', 'english'], description: 'Preferred language' },
  source: { type: 'string', enum: ['walk-in', 'website'], description: 'How the visitor arrived' },
};

export function createVisitor(data) {
  return {
    id: Date.now().toString(),
    name: data.name,
    phone: data.phone,
    course: data.course,
    purpose: data.purpose || 'admission inquiry',
    visitTime: new Date().toISOString(),
    language: data.language || 'english',
    source: data.source || 'walk-in',
  };
}
