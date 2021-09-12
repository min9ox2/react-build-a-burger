export const updateObject = (oldObject, newProperties) => {
  return {
    ...oldObject,
    ...newProperties,
  };
};

export const checkValidity = (input, rule) => {
  let isValid = true;
  if (rule.required) {
    isValid = input.trim() !== "" && isValid;
  }
  if (rule.minLength) {
    isValid = input.length >= rule.minLength && isValid;
  }
  if (rule.maxLength) {
    isValid = input.length <= rule.maxLength && isValid;
  }
  if (rule.isEmail) {
    isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(input);
  }
  console.log("isvalid", isValid);
  return isValid;
};
