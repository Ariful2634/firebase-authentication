
import './App.css'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';

function App() {
  const [logIn, setLogIn] = useState(null)
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const gitHubProvider = new GithubAuthProvider()

  const googleSignin = () => {
    signInWithPopup(auth, provider)
      .then(res => {
        const loginUser = res.user;
        setLogIn(loginUser)
        console.log(loginUser)

      })
      .catch(error => {
        console.log(error)
      })
  }

  const googleSignOut = () => {
    signOut(auth)
      .then(res => {
        setLogIn(null)
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const gitSignIn = ()=>{
    signInWithPopup(auth,gitHubProvider)
    .then(res => {
      const loginUser = res.user;
      setLogIn(loginUser)
      console.log(loginUser)

    })
    .catch(error => {
      console.log(error)
    })

  }


  return (



    <>

      <h1>Firebase Authentication</h1>
      <div>
       { logIn ? <button onClick={googleSignOut}>Sign out</button> :
         <div>
          <button onClick={googleSignin}>Sign in</button>
          <button onClick={gitSignIn}>GitHub</button>
         </div> 
        }

      </div>
      {
        logIn && <div>
          <h2>Name: {logIn.displayName}</h2>
          <p>Email: {logIn.email}</p>
          <img src={logIn.photoURL} alt="" />
        </div>
      }

    </>
  )
}

export default App
