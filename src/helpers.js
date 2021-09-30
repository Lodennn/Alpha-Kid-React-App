import { query, where } from "firebase/firestore";

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
  for (let item of transformedData) {
    transformedDataObject[item] = data[`${item}`];
  }
  return transformedDataObject;
};

export const getQueries = (queriesArray, collectionRef) => {
  let devQueries;
  let fetchQuery;

  if (queriesArray) {
    devQueries = queriesArray.map((q) => where(q.where, q.condition, q.value));

    fetchQuery = query(collectionRef, ...devQueries);
  } else {
    fetchQuery = query(collectionRef);
  }
  return fetchQuery;
};

export const getQueryData = (querySnapshot) => {
  let data = [];

  querySnapshot.forEach((profile) => {
    data.push(profile.data());
  });

  return data;
};

export const isEven = (num) => num % 2 === 0;
