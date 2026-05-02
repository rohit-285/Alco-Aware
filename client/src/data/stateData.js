const commonDryDays = ['Jan 26', 'Aug 15', 'Oct 2'];

const openState = (dryDays = commonDryDays) => ({
  isDry: false,
  dryDays,
  legalBAC: 0.03,
  penalties: 'Driving above 0.03% BAC can lead to fines, licence action, or arrest.'
});

export const INDIA_STATE_DATA = {
  'Andhra Pradesh': openState(),
  'Arunachal Pradesh': openState(),
  Assam: openState(),
  Bihar: { isDry: true, dryDays: ['All year'], legalBAC: 0, penalties: 'Alcohol sale and consumption are prohibited with strict penalties.' },
  Chhattisgarh: openState(),
  Goa: openState(['Oct 2']),
  Gujarat: { isDry: true, dryDays: ['All year'], legalBAC: 0, penalties: 'Strict prohibition. Permit rules apply for limited categories.' },
  Haryana: openState(),
  'Himachal Pradesh': openState(),
  Jharkhand: openState(),
  Karnataka: openState(['Oct 2', 'Nov 1']),
  Kerala: openState(['Oct 2', 'First day of each month']),
  'Madhya Pradesh': openState(),
  Maharashtra: openState(commonDryDays),
  Manipur: { isDry: true, dryDays: ['Most districts'], legalBAC: 0, penalties: 'Local prohibition and permit rules apply.' },
  Meghalaya: openState(),
  Mizoram: openState(),
  Nagaland: { isDry: true, dryDays: ['All year'], legalBAC: 0, penalties: 'State prohibition applies.' },
  Odisha: openState(),
  Punjab: openState(),
  Rajasthan: openState(),
  Sikkim: openState(),
  'Tamil Nadu': openState(['Oct 2']),
  Telangana: openState(['Oct 2']),
  Tripura: openState(),
  'Uttar Pradesh': openState(),
  Uttarakhand: openState(),
  'West Bengal': openState(['Oct 2']),
  'Andaman and Nicobar Islands': openState(),
  Chandigarh: openState(),
  'Dadra and Nagar Haveli and Daman and Diu': openState(),
  Delhi: openState(['Oct 2']),
  'Jammu and Kashmir': openState(),
  Ladakh: openState(),
  Lakshadweep: { isDry: true, dryDays: ['Most islands'], legalBAC: 0, penalties: 'Alcohol is highly restricted except limited licensed areas.' },
  Puducherry: openState()
};
