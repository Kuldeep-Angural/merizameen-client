export const addDelay = (delay) => {
  return new Promise((res) => setTimeout(res, delay ? delay : 0));
};

export const isInValidData = (data) => {
  return ['', null, undefined].includes(data);
};

export const isBothObjectEqual = ({obj1,obj2}) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const getFirstWord = (inputString) => {
  return  inputString?.split(' ')[0];
}

export const  calculateEndDate = (currentDate, numberOfMonths) => {
  let endDate = new Date(currentDate);
  endDate.setMonth(endDate.getMonth() + numberOfMonths);
  if (endDate.getDate() < currentDate.getDate()) {
      endDate.setDate(0);
  }
  return endDate;
}

export const fullAddress = (data) => {
  if (!data) return "";

  const { localAddress, city, state, pinCode } = data;

  const addressParts = [
    localAddress || "",
    city || "",
    state || "",
    pinCode || ""
  ];

  return addressParts.filter(part => part).join(", ");
};

