

export const addDelay = (delay) => {
  return new Promise((res) => setTimeout(res, delay ? delay : 0));
};
export const isInValidData = (data)=>{
return ['',null,undefined].includes(data)
}
