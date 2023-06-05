import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");

//console.log(auth?.currentUser?.email);

  const signUp = async () => {
    try{
        await createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log('user created',cred.user);
        })
    } catch(err) {
        console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try{
        await signInWithPopup(auth, googleProvider)
    } catch(err) {
        console.error(err);
    }
  };

  const Login = async () => {
    try{
        await signInWithEmailAndPassword(auth, lemail,lpassword)
        .then((cred) => {
          console.log('User logged in',cred.user);
        })
    } catch(err) {
        console.error(err);
    }
  };

  const logout = async () => {
    try{
        await signOut(auth)
    } catch(err) {
        console.error(err);
    }
  };

  return (
    <div>
      <h5>Sign Up</h5>
      <input type="email" placeholder="Email.." onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password.." onChange={(e) => setPassword(e.target.value)} />
      <br/><br/>
      <button onClick={signUp}>Sign Up</button>
      <br/>
      <br/>
      <br/>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <br/><br/>


      <h5>Login</h5>
      <input type="email" placeholder="Email.." onChange={(e) => setLemail(e.target.value)} /><br/>
      <input type="password" placeholder="Password.." onChange={(e) => setLpassword(e.target.value)} /><br /><br />
      <button onClick={Login}>Sign Up</button><br /><br/>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
