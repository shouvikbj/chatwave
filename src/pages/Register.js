import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import Add from "../images/addAvatar.png";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(displayName);
    console.log(email);
    console.log(password);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          setError(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatWave</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type={"text"} placeholder={"Enter your Name"} />
          <input type={"email"} placeholder={"Enter your E-mail"} />
          <input type={"password"} placeholder={"Enter your password"} />
          <input style={{ display: "none" }} type={"file"} id={"file-input"} />
          <label htmlFor="file-input">
            <img alt="add-avatar" src={Add} />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up!</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
