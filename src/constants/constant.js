export const SESSION_KEYS = {
  TOKEN: 'TOKEN',
  EXPIRY: 'EXPIRY',
  FACILITY: 'FACILITY',
  USER:'USER'
}

export const medium = [
  { value: 'Sell', label: 'Sell' },
  { value: 'Rent', label: 'Rent' },
];

export const state = ['Punjab', 'Himachal'];

export const propertyTypes = [
  { value: '1Bhk', label: '1Bhk' },
  { value: '2Bhk', label: '2Bhk' },
  { value: '3Bhk', label: '3Bhk' },
  { value: '3+Bhk', label: '3+Bhk' },
  { value: 'Pg', label: 'Pg' },
  { value: 'Plot', label: 'Plot' },
  { value: 'Commercial', label: 'Commercial' },
];

export const amenities = [
  { name: 'carParking', label: 'Car parking' },
  { name: 'maintenance', label: 'Maintenance' },
  { name: 'vastuCompliant', label: 'Vastu compliant' },
  { name: 'powerBackup', label: 'Pawer Backup' },
  { name: 'park', label: 'Park' },
  { name: 'gym', label: 'Gym' },
  { name: 'clubHouse', label: 'Club House' },
];

export const landMarks = [
  { name: 'hospital', label: 'Hospital', erroMessage: '' },
  { name: 'atm', label: 'Atm', erroMessage: '' },
  { name: 'bank', label: 'Bank', erroMessage: '' },
  { name: 'railway', label: 'Railway-Station', erroMessage: '' },
  { name: 'metro', label: 'Metro-Station', erroMessage: '' },
  { name: 'airport', label: 'Airport', erroMessage: '' },
];

export const basicInfo = [
  { name: 'bedRoom', label: 'Bedroom' },
  { name: 'bathRoom', label: 'Bathroom' },
  { name: 'totalArea', label: `Total (Yards)\u00B2` },
  { name: 'carpetArea', label: `Carpet (Yards)\u00B2` },
  { name: 'propertyAge', label: `Age Of Property` },
];

export const pages = ['Products', 'Pricing', 'Blog'];

export const userSettings = [
  'Profile', 'Dashboard', 'Logout'
];

export const options = [
  { value: 'Agent', label: 'Agent' },
  { value: 'Builder', label: 'Builder' },
  { value: 'Individual', label: 'Individual' },
  { value: 'Other', label: 'Other' },
];

export const filterChips = [
  { name: 'Flats', value: 'Flats' },
  { name: 'PG', value: 'PG' },
  { name: 'Commercial', value: 'Commercial' },
  { name: 'Plot', value: 'Plot' },
  { name: 'Rental', value: 'Rental' },
  { name: '1Bhk', value: '1Bhk' },
  { name: '2Bhk', value: '2Bhk' },
  { name: '3Bhk', value: '3Bhk' },
  { name: '3+Bhk', value: '3+Bhk' },
  { name: 'Villas', value: 'Villas' },
  { name: 'Farm-House', value: 'Farm-House' },
];

export const dateFormat = {
  date:'MM/dd/yyyy',
  dateAndTime:'DD-MM-YYYY, h:mm:ss a'
}



export const googleConfig = {
  clientId : `${process.env.GOOGLE_CLIENT_ID}`,
  userEmailScope : 'https://www.googleapis.com/auth/userinfo.email',
  userProfileScope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics.readonly',
  analyticsScope : 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/analytics.readonly',
  redirectUrl : `${process.env.HOST}login`
}
export const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=${googleConfig.userProfileScope}&response_type=code&client_id=${googleConfig.clientId}&redirect_uri=${googleConfig.redirectUrl}`

