import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";

export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
    console.log("User added:", userId);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const addPost = async (userId, post) => {
  console.log("ADD POST", post);
  try {
    const userDocRef = doc(db, "posts", userId);
    const userDocSnap = await getDoc(userDocRef);

    // Генеруємо унікальний UID
    const postWithId = {
      ...post,
      uid: uuid.v4(),
    };

    if (userDocSnap.exists()) {
      const existingPosts = userDocSnap.data().posts || [];
      await setDoc(
        userDocRef,
        { userId, posts: [...existingPosts, postWithId] },
        { merge: true }
      );
    } else {
      await setDoc(
        userDocRef,
        { userId, posts: [postWithId] },
        { merge: true }
      );
    }

    console.log("Post added:", userId, postWithId.uid);
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

export const getAllPosts = async (userId) => {
  console.log("GET ALL POSTS", userId);
  try {
    const userDocRef = doc(db, "posts", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const posts = userDocSnap.data().posts || [];
      console.log("Posts retrieved:", posts);
      return posts;
    } else {
      console.log("No posts found for user:", userId);
      return [];
    }
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
};

// export const addCommentToPost = async (postId, comment) => {
//   console.log("ADD COMMENT", comment);
//   try {
//     const postDocRef = doc(db, "posts", postId);
//     const postDocSnap = await getDoc(postDocRef);

//     if (postDocSnap.exists()) {
//       const existingComments = postDocSnap.data().comments || [];
//       await setDoc(
//         postDocRef,
//         { comments: [...existingComments, comment] },
//         { merge: true }
//       );
//     } else {
//       await setDoc(postDocRef, { comments: [comment] }, { merge: true });
//     }

//     console.log("Comment added:", postId, comment);
//   } catch (error) {
//     console.error("Error adding comment:", error);
//   }
// };

export const addCommentToPost = async (postId, userId, comment) => {
  console.log("ADD COMMENT", comment);
  try {
    const userDocRef = doc(db, "posts", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const posts = userDocSnap.data().posts;
      const postIndex = posts.findIndex((post) => post.uid === postId);

      if (postIndex !== -1) {
        const existingComments = posts[postIndex].comments || [];
        posts[postIndex].comments = [...existingComments, comment];
        await setDoc(userDocRef, { posts }, { merge: true });
      } else {
        throw new Error("Post not found");
      }
    } else {
      throw new Error("User document not found");
    }

    console.log("Comment added to post:", postId, comment);
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const updateUserInFirestore = async (uid, data) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
    console.log("User data updated to Firestore:", uid);
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};

export const uploadImage = async (userId, file, fileName, folderName) => {
  try {
    const imageRef = ref(storage, `${folderName}/${userId}/${fileName}`);

    console.log("Uploading to:", imageRef.fullPath);
    const result = await uploadBytes(imageRef, file);
    console.log("Upload result:", result);
    return imageRef;
  } catch (error) {
    console.error("Error uploading image:", error, error.payload);
    throw error;
  }
};

export const getImageUrl = async (imageRef) => {
  const url = await getDownloadURL(imageRef);
  return url;
};
