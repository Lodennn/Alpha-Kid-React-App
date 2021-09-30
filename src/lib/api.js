import { API_KEY } from "../config";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import db from "./db";
import { transformDataFn, getQueries, getQueryData } from "../helpers";

// Auth
export const userSignup = async (bodyData) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }
    );
    if (!response.ok) throw new Error("User failed to signup");
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const userLogin = async (bodyData) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }
    );
    if (!response.ok) throw new Error("Email not found!");
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

// WILL TRY TO REFACTOR IT
export const addUser = async (requestData) => {
  try {
    const userRef = doc(collection(db, "users"));
    const requestDataWithId = {
      ...requestData,
      user: { id: userRef.id, ...requestData.user },
    };
    await setDoc(userRef, requestDataWithId);
    return requestDataWithId;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

///////////////////////////////////////////////////////////////////////////////////
// 1. INSERTING
export const insertDataFS = async (requestData, transformData = []) => {
  try {
    const { collection: coll, data } = requestData;

    const isTransformed = transformData.length > 0;

    const docRef = doc(collection(db, coll));

    let requestDataWithId = {};

    if (isTransformed) {
      let transformedDataObject = transformDataFn(requestData, transformData);
      requestDataWithId = {
        id: docRef.id,
        ...transformedDataObject,
      };
    } else {
      requestDataWithId = {
        id: docRef.id,
        ...data,
      };
    }

    await setDoc(docRef, requestDataWithId);
    return requestDataWithId;
  } catch (err) {
    throw err;
  }
};
///////////////////////////////////////////////////////////////////////////////////

// WILL TRY TO REFACTOR
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const fetchedUserData = [];
    querySnapshot.forEach((doc) => {
      fetchedUserData.push(doc.data());
    });
    return fetchedUserData;
  } catch (e) {
    console.error("Error fetching document: ", e);
  }
};

///////////////////////////////////////////////////////////////////////////////////
// 1. FETCH COLLECTION

export const fetchDataFS = async (requestData, filterBy = null) => {
  try {
    const { collection: coll, queries } = requestData;

    const collectionRef = collection(db, coll);

    const querySnapshot = await getDocs(getQueries(queries, collectionRef));

    if (!!filterBy) {
      return getQueryData(querySnapshot).filter((d) => d.id !== filterBy.id);
    }

    return getQueryData(querySnapshot);
  } catch (err) {
    throw err;
  }
};

//  FETCH DOC
export const fetchDocFS = async (requestData) => {
  try {
    const { collection: coll, id } = requestData;
    const docRef = doc(db, coll, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (err) {
    throw err;
  }
};

///////////////////////////////////////////////////////////////////////////////////

export const updateWorkshop = async (requestData) => {
  try {
    const { collection: coll, workshopId, data } = requestData;
    const workshopRef = doc(db, coll, workshopId);
    await updateDoc(workshopRef, data);
  } catch (err) {
    throw err;
  }
};

export const deleteDocFS = async (requestData) => {
  try {
    const { collection: coll, docId } = requestData;
    const docRef = doc(db, coll, docId);
    await deleteDoc(docRef);
  } catch (err) {
    throw err;
  }
};

export const deleteDoneWorkshopFS = async (requestData) => {
  try {
    const { doneWorkshopId } = requestData;
    const doneWorkshopRef = collection(db, "doneWorkshops", doneWorkshopId);
    await deleteDoc(doneWorkshopRef);
  } catch (err) {
    throw err;
  }
};
