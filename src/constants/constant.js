export const SESSION_KEYS = {
  TOKEN: 'TOKEN',
  EXPIRY: 'EXPIRY',
  FACILITY: 'FACILITY',
  USER: 'USER',
};

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

export const pages = ['Products', 'Pricing', 'Blog'];

export const userSettings = ['Profile', 'Dashboard', 'Plans', 'Logout'];

export const MemberShips = {
  Premium_Access: 'Premium Access',
  Standard_Access: 'Standard Access',
};

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
  date: 'DD/MM/YYYY',
  dateAndTime: 'DD-MM-YYYY, h:mm:ss a',
  dateAndTime2: 'DD-MM-YYYY, hh:mm',
};

export const googleConfig = {
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
  userEmailScope: 'https://www.googleapis.com/auth/userinfo.email',
  userProfileScope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics.readonly',
  analyticsScope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/analytics.readonly',
  redirectUrl: `${process.env.HOST}login`,
};
export const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=${googleConfig.userProfileScope}&response_type=code&client_id=${googleConfig.clientId}&redirect_uri=${googleConfig.redirectUrl}`;

export const Standard_Access = {
  posts:{
    post:"2 free posts",
    info:'After posting two properties, you must delete at least one before you can post another.'
  },
  masking:{
    locationMasking:"You dont be able to see others property's loaction .",
    contactMasking:"You dont be able to see others property's owners contacts .",
    likes:"You dont see who likes your property."

  }
}


export const Premium_Access = {
  posts:{
    post:"10 free posts",
    info:'After posting all 10 properties, you must delete at least one before you can post another.'
  },
  masking:{
    locationMasking:"You can see others property's loaction .",
    contactMasking:"You see others property's owners contacts .",
    likes:"You can see who likes your property."
  }
}