import { API_KEY, API_URL } from "../config";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import db from "./db";

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
    console.log("Error: api.js 💣💣💣", err.message);
    throw err;
  }
};

export const insertProfileFS = async (requestData) => {
  try {
    const profileRef = doc(collection(db, "profiles"));
    const requestDataWithId = {
      id: profileRef.id,
      ...requestData,
    };
    await setDoc(profileRef, requestDataWithId);
    return requestDataWithId;
  } catch (err) {
    throw err;
  }
};

export const fetchAllProfilesFS = async (parentId) => {
  try {
    const profilesRef = collection(db, "profiles");
    // Create a query against the collection.
    const q = query(profilesRef, where("parentId", "==", parentId));
    const querySnapshot = await getDocs(q);
    const profilesData = [];
    querySnapshot.forEach((profile) => {
      profilesData.push(profile.data());
    });
    return profilesData;
  } catch (err) {
    throw err;
  }
};

export const insertWorkshopFS = async (requestData) => {
  try {
    const workshopRef = doc(collection(db, "workshops"));
    const workshopDataWithId = { id: workshopRef.id, ...requestData };
    await setDoc(workshopRef, workshopDataWithId);
    return workshopDataWithId;
  } catch (err) {
    throw err;
  }
};

export const fetchAllWorkshopsFS = async () => {
  try {
    const workshopsRef = collection(db, "workshops");
    const q = query(workshopsRef, where("hasExam", "==", true));
    const querySnapshot = await getDocs(q);
    const availableWorkshopsData = [];
    querySnapshot.forEach((workshop) => {
      availableWorkshopsData.push(workshop.data());
    });
    return availableWorkshopsData;
  } catch (err) {
    throw err;
  }
};

export const fetchAvailableWorkshops = async (teacherId) => {
  try {
    const workshopsRef = collection(db, "workshops");
    //prettier-ignore
    const q = query(workshopsRef, where('teacherId', '==', teacherId), where("hasExam", "==", true));
    const querySnapshot = await getDocs(q);
    const availableWorkshopsData = [];
    querySnapshot.forEach((workshop) => {
      availableWorkshopsData.push(workshop.data());
    });
    return availableWorkshopsData;
  } catch (err) {
    throw err;
  }
};

export const fetchNotAvailableWorkshops = async (teacherId) => {
  try {
    const workshopsRef = collection(db, "workshops");
    //prettier-ignore
    const q = query(workshopsRef, where('teacherId', '==', teacherId), where("hasExam", "==", false));
    const querySnapshot = await getDocs(q);
    const notAvailableWorkshopsData = [];
    querySnapshot.forEach((workshop) => {
      notAvailableWorkshopsData.push(workshop.data());
    });
    return notAvailableWorkshopsData;
  } catch (err) {
    throw err;
  }
};

export const fetchSingleWorkshopFS = async (workshopId) => {
  try {
    const workshopsRef = doc(db, "workshops", workshopId);
    const docSnap = await getDoc(workshopsRef);
    return docSnap.data();
  } catch (err) {
    throw err;
  }
};

export const insertExamFS = async (requestData) => {
  try {
    const examRef = doc(collection(db, "exams"));
    const examDataWithId = { id: examRef.id, ...requestData };
    await setDoc(examRef, examDataWithId);
    return examDataWithId;
  } catch (err) {
    throw err;
  }
};

export const updateWorkshop = async (request) => {
  try {
    const workshopRef = doc(db, "workshops", request.workshopId);
    const updatedWorkshop = await updateDoc(workshopRef, request.data);
  } catch (err) {
    throw err;
  }
};

export const fetchExamFS = async (workshopId) => {
  try {
    const examsCollectionRef = collection(db, "exams");
    const q = query(examsCollectionRef, where("workshopId", "==", workshopId));
    const querySnap = await getDocs(q);
    const examData = [];
    querySnap.forEach((exam) => {
      examData.push(exam.data());
    });
    const [{ exam }] = examData;
    return exam;
  } catch (err) {
    throw err;
  }
};

export const insertExamSheet = async (requestData) => {
  try {
    const examSheetRef = doc(collection(db, "examSheets"));
    const examSheetDataWithId = { id: examSheetRef.id, ...requestData };
    await setDoc(examSheetRef, examSheetDataWithId);
    return examSheetDataWithId;
  } catch (err) {
    throw err;
  }
};

export const fetchExamSheet = async (requestData) => {
  try {
    const { profileId, workshopId } = requestData;
    console.log("requestData: ", requestData);
    const examSheetRef = collection(db, "examSheets");
    const q = query(
      examSheetRef,
      where("profileId", "==", profileId),
      where("workshopId", "==", workshopId)
    );
    const querySnap = await getDocs(q);
    let examSheetData = {};
    querySnap.forEach((sheet) => {
      examSheetData = sheet.data();
    });
    return examSheetData;
  } catch (err) {
    throw err;
  }
};

export const insertDoneWorkshops = async (requestData) => {
  try {
    const { profileId, data } = requestData;

    const workshopData = {
      image: data.image,
      lessons: data.lessons,
      name: data.name,
      workshopId: data.id,
    };
    const doneWorkshopRef = doc(collection(db, "doneWorkshops"));

    const doneWorkshopDataWithId = {
      id: doneWorkshopRef.id,
      profileId,
      ...workshopData,
    };
    await setDoc(doneWorkshopRef, doneWorkshopDataWithId);
    return doneWorkshopDataWithId;
  } catch (err) {
    throw err;
  }
};

export const fetchDoneWorkshops = async (profileId) => {
  try {
    const doneWorkshopsRef = collection(db, "doneWorkshops");
    const q = query(doneWorkshopsRef, where("profileId", "==", profileId));
    const querySnapshot = await getDocs(q);
    const doneWorkshopsData = [];
    querySnapshot.forEach((workshop) => {
      doneWorkshopsData.push(workshop.data());
    });
    console.log("doneWorkshopsData", doneWorkshopsData);
    return doneWorkshopsData;
  } catch (err) {
    throw err;
  }
};
