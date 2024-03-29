import { Modal, message } from "antd";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { app } from "./firebase";

import {
  getDownloadURL,
  getStorage,
  ref as storageReference,
  uploadBytes,
  getBlob,
} from "firebase/storage";

const storage = getStorage(app);
const firestore = getFirestore(app);
// Create (Thêm dữ liệu)
const addDocument = (collectionPath, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(collection(firestore, collectionPath), data);
      const newDocument = { ...data, id: docRef.id }; // Sử dụng id của Firebase

      await updateDoc(doc(firestore, collectionPath, docRef.id), newDocument);
      console.log(newDocument);
      console.log("Tài liệu đã được thêm vào Firestore với ID:", docRef.id);
      resolve(newDocument);
    } catch (error) {
      console.error("Lỗi khi thêm tài liệu vào Firestore:", error);
      reject(error);
    }
  });
};

// Read (Đọc dữ liệu)
const getDocument = (collectionPath, docId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(firestore, collectionPath, docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Dữ liệu tài liệu:", docSnap.data());
        resolve(docSnap.data()); // Trả về dữ liệu của tài liệu
      } else {
        console.log("Không tìm thấy tài liệu với ID:", docId);
        resolve(null); // Trả về null nếu không tìm thấy tài liệu
      }
    } catch (error) {
      console.error("Lỗi khi đọc tài liệu từ Firestore:", error);
      message.error(error);
      reject(error); // Trả về lỗi để xử lý bên ngoài
    }
  });
};

const getAllDocuments = async (collectionPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arr = [];

      const querySnapshot = await getDocs(
        collection(firestore, collectionPath)
      );
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });

      resolve(arr);
    } catch (error) {
      console.error("Lỗi khi đọc danh sách tài liệu từ Firestore:", error);
      Modal.error({
        title: "getAllDocuments",
        content: error,
      });
    }
  });
};

// Update (Cập nhật dữ liệu)
const updateDocument = (collectionPath, docId, newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(firestore, collectionPath, docId);
      await updateDoc(docRef, newData);
      console.log("Tài liệu đã được cập nhật thành công trong Firestore.");
      resolve(newData);
    } catch (error) {
      console.error("Lỗi khi cập nhật tài liệu trong Firestore:", error);
      message.error(error); // Tùy thuộc vào thư viện bạn sử dụng để hiển thị thông báo lỗi
    }
  });
};

// Delete (Xóa dữ liệu)
const deleteDocument = (collectionPath, docId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(firestore, collectionPath, docId);
      await deleteDoc(docRef);
      console.log("Tài liệu đã được xóa khỏi Firestore.");
      resolve();
    } catch (error) {
      console.error("Lỗi khi xóa tài liệu từ Firestore:", error);
      message.error(error); // Tùy thuộc vào thư viện bạn sử dụng để hiển thị thông báo lỗi
    }
  });
};

const uploadFile = async (file, path) => {
  try {
    const storageRef = storageReference(storage, path);
    await uploadBytes(storageRef, file);

    // Get the download URL after successful upload
    const downloadURL = await getFileDownloadURL(path);
    getBlob(storageRef)
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const getFileDownloadURL = (path) => {
  const fileRef = storageReference(storage, path);
  return getDownloadURL(fileRef);
};
export {
  addDocument,
  deleteDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
  uploadFile,
};
