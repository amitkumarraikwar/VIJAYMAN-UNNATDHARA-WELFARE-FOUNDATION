export type VerificationStatus = 'verified' | 'supplied' | 'reported' | 'awaiting-confirmation';

export const organization = {
  name: 'Vijayman Unnatdhara Welfare Foundation',
  shortName: 'Vijayman Unnatdhara',
  tagline: 'सेवा ही धर्म, सेवा ही कर्म',
  taglineEnglish: 'Service is our religion, service is our duty.',
  description: 'A Section 8 non-profit foundation based in Lalitpur, Uttar Pradesh, committed to community participation, social welfare and inclusive development.',
  email: 'vufoundation2024@gmail.com',
  location: 'Lalitpur, Uttar Pradesh, India',
  address: 'Basant Vihar Colony, Vanshipura, Lalitpur, Uttar Pradesh, India',
  directors: ['Vijay Verma', 'Durgesh', 'Omkar Rathore'],
  identity: {
    cin: {
      value: 'U88900UP2024NPL202689',
      status: 'supplied' as VerificationStatus,
      source: 'Foundation-supplied update',
      thirdPartyReport: { status: 'reported' as VerificationStatus, source: 'Third-party company directories' }
    },
    section8License: { value: 'LN-156702', status: 'supplied' as VerificationStatus, source: 'Organization business card' },
    incorporationDate: { value: '15 May 2024', status: 'reported' as VerificationStatus, source: 'Third-party company directories' },
    previousSuppliedCin: { value: 'U88900UP2024NPL20268', status: 'supplied' as VerificationStatus, source: 'Previous organization business card' },
    alternateAddress: { value: 'Bansipura / C/O Mithlesh Rathor, Lalitpur – 284403', status: 'reported' as VerificationStatus, source: 'Third-party company directories' }
  }
} as const;

export const verificationNotes = [
  'Confirm the CIN against the official MCA record before publishing it as verified.',
  'Confirm whether the official locality spelling is Vanshipura or Bansipura.',
  'Confirm the Section 8 licence number with an authorized representative.',
  'Confirm incorporation date, registered address, phone number and any tax or donor registrations.',
  'Supply approved biographies, activity records, photographs and official social profiles before publishing them.'
];
