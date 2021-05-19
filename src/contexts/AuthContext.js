import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../firebase" // file which has all keys ..

const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext); // exposing the context outside to use ..
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    const [loading, setLoading] = useState(true);

    // this will pass to firbase and return a promise which can be used in signUp file .
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }


    // this will pass to firbase and return a promise which can be used in Login file .
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
      }
    
      function updatePassword(password) {
        return currentUser.updatePassword(password)
      }



    //call this only once at Mount so []
    useEffect(() => {
        //when we create a new user we set using fireabse auth mthd i.e onAuthStateChanged
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        // when unmount we unsubscribe as in above auth.onAuthStateChanged 
        //wil return a method when execs 
        return unsubscribe;


    }, [])


    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>

            { !loading &&  children}  {/* so that all comp's wrapped under gets the data  */}

        </AuthContext.Provider>
    )
}
