import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../config";
// import {} from "../redux/store/store";
import { setUserInfo, clearUserInfo } from "../redux/reducers/userSlice";
import {
  updateUserInFirestore,
  addUser,
  uploadImage,
  getImageUrl,
  getUser,
} from "../utils/firestore";

export const registerDB = async ({
  email,
  password,
  login,
  file,
  fileName,
  dispatch,
}) => {
  console.log("REGISTER DB", email, password, login, file, fileName);
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredentials.user;
  //   console.log("USER", user.uid);

  //   await updateProfile(user, { displayName: login });

  const imageRef = await uploadImage(user.uid, file, fileName, "profilePhotos");
  //   console.log("IMAGE REF", imageRef);

  const imageUrl = await getImageUrl(imageRef);
  //   console.log("IMAGE URL", imageUrl);

  await addUser(user.uid, {
    profilePhoto: imageUrl,
    displayName: login,
  });

  await authStateChanged(dispatch);
};

export const loginDB = async ({ email, password }, dispatch) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;

    dispatch(
      setUserInfo({
        uid: user.uid,
        email: user.email,
        // photoURL: user.photoURL,
      })
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const logoutDB = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUserInfo());
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const authStateChanged = async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    console.log("AUTH STATE CHANGED", user);
    if (user) {
      const userData = await getUser(user.uid);

      dispatch(
        setUserInfo({
          ...userData,
          uid: user.uid,
          email: user.email,
        })
      );
    } else {
      dispatch(clearUserInfo());
    }
  });
};
