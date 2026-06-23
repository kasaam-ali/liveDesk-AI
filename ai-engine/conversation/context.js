// Placeholder conversation context and FAQs
// Saylani Mass IT specific context and FAQs

const saylaniContext = {
  organization: {
    name: "Saylani Mass IT",
    location: "Karachi, Pakistan",
    type: "IT Training Institute"
  },

  courses: [
    {
      name: "Web & Mobile App Development",
      duration: "6 months",
      fee: "5000 PKR/month",
      schedule: "Mon/Wed/Fri - 9 AM to 12 PM"
    },
    {
      name: "Artificial Intelligence",
      duration: "6 months",
      fee: "6000 PKR/month",
      schedule: "Tue/Thu/Sat - 2 PM to 5 PM"
    },
    {
      name: "Cloud Computing",
      duration: "4 months",
      fee: "5000 PKR/month",
      schedule: "Mon/Wed/Fri - 2 PM to 5 PM"
    },
    {
      name: "Graphic Designing",
      duration: "3 months",
      fee: "4000 PKR/month",
      schedule: "Tue/Thu - 10 AM to 1 PM"
    }
  ],

  faqs: {
    admission: {
      question: "Admission kaise lein?",
      answer: "Admission ke liye aapko CNIC ki copy, 2 passport size photos, aur admission form fill karna hoga. Form reception se le sakte hain."
    },
    fee: {
      question: "Fee kitni hai?",
      answer: "Courses ki fee 4000 se 6000 PKR per month hai. Specific course ki fee course details mein check karein."
    },
    timing: {
      question: "Class timing kya hai?",
      answer: "Different courses ki different timings hain. Subah 9 AM se shaam 5 PM tak classes hoti hain."
    },
    certificate: {
      question: "Certificate milega?",
      answer: "Ji haan, course complete karne par Saylani ka certified certificate milta hai."
    },
    age: {
      question: "Age limit kya hai?",
      answer: "Koi age limit nahi hai. 15 saal se upar koi bhi join kar sakta hai."
    }
  },

  workingHours: {
    monday: "9:00 AM - 6:00 PM",
    tuesday: "9:00 AM - 6:00 PM",
    wednesday: "9:00 AM - 6:00 PM",
    thursday: "9:00 AM - 6:00 PM",
    friday: "9:00 AM - 6:00 PM",
    saturday: "9:00 AM - 2:00 PM",
    sunday: "Closed"
  },

  contact: {
    phone: "+92-21-9924567",
    email: "info@saylanimassit.com",
    address: "Street 14, Block 7, KDA Scheme 5, Clifton, Karachi"
  }
};

module.exports = saylaniContext;