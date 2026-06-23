export interface ParsedFormData {
  name?: string;
  phone?: string;
  course?: string;
}

const namePatterns = [
  /(?:mera|my|mai|i'm|i am)\s*(?:naam|name)\s+(?:hai|is)?\s*[:]?\s*([a-zA-Z\s]+)/i,
  /(?:my name(?:'s| is)?)\s+([a-zA-Z\s]+)/i,
  /(?:mai|main)\s+([a-zA-Z\s]+)\s+(?:hoon|hun|hũ)/i,
  /^([a-zA-Z]{2,}(?:\s+[a-zA-Z]{2,})?)$/,
];

const phonePatterns = [
  /(?:phone|number|mobile|cell|contact|phone number|mobile number)\s*(?:hai|is)?\s*[:]?\s*([\d\s\+\-]{7,15})/i,
  /(?:030|031|032|033|034|035|036|037|038|039|040)[\d\-]{7,12}/,
  /(?:my|mera|apna)\s*(?:phone|number|mobile)\s*(?:hai|is)?\s*(\d[\d\s\-]{6,14})/i,
  /(\+?\d[\d\s\-]{7,15})/,
];

const coursePatterns = [
  /(?:course|program|class|study|subject|field)\s*(?:hai|is|chahiye|chahta|chahti|lena|karna)?\s*[:]?\s*([a-zA-Z\s]+)/i,
  /(?:web|web\s*development|web\s*dev|full\s*stack)/i,
  /(?:ai|artificial\s*intelligence|machine\s*learning|ml)/i,
  /(?:graphic|graphic\s*design|designing|design)/i,
  /(?:python|programming|software)/i,
  /(?:data\s*science|data)/i,
  /(?:mobile\s*app|app\s*development|flutter)/i,
  /(?:cloud|cloud\s*computing)/i,
];

const courseMapping: Record<string, string> = {
  web: 'Web Development',
  'web development': 'Web Development',
  'web dev': 'Web Development',
  'full stack': 'Web Development',
  python: 'Python Programming',
  programming: 'Python Programming',
  ai: 'AI & Machine Learning',
  'artificial intelligence': 'AI & Machine Learning',
  'machine learning': 'AI & Machine Learning',
  ml: 'AI & Machine Learning',
  graphic: 'Graphic Design',
  'graphic design': 'Graphic Design',
  design: 'Graphic Design',
  designing: 'Graphic Design',
  'data science': 'Data Science',
  data: 'Data Science',
  'mobile app': 'Mobile App Development',
  'app development': 'Mobile App Development',
  flutter: 'Mobile App Development',
  cloud: 'Cloud Computing',
  'cloud computing': 'Cloud Computing',
};

export function extractFormData(text: string): ParsedFormData {
  const result: ParsedFormData = {};
  const lower = text.toLowerCase();

  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) {
      const name = match[1] || match[0];
      if (name.toLowerCase() !== lower.trim()) {
        result.name = name.trim();
        break;
      }
    }
  }

  for (const pattern of phonePatterns) {
    const match = text.match(pattern);
    if (match) {
      const phone = (match[1] || match[0]).replace(/[^0-9+]/g, '');
      if (phone.length >= 7) {
        result.phone = phone;
        break;
      }
    }
  }

  for (const [key, value] of Object.entries(courseMapping)) {
    if (lower.includes(key)) {
      result.course = value;
      break;
    }
  }

  return result;
}
