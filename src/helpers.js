export const featureWillBeAdded = false;
export const generateRandomNumber = () => {
  return Math.trunc(Math.random() * 3) + 1;
};

export const persistLocalStorage = (key, value, stringify = true) => {
  if (stringify) {
    return localStorage.setItem(key, JSON.stringify(value));
  } else {
    return localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key, parse = true) => {
  if (parse) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return localStorage.getItem(key);
  }
};

export const removeLocalStorageItem = (key) => {
  return localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};

export const transformDataFn = (data, transformedData) => {
  let transformedDataObject = {};
  console.log("data: ", data, "transformedData: ", transformedData);
  for (let item of transformedData) {
    console.log(item);
    transformedDataObject[item] = data[`${item}`];
  }
  return transformedDataObject;
};
