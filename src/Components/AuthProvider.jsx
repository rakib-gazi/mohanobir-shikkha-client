import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase";
import useAxiosPublic from "../Hooks/useAxiosPublic";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading]= useState(true);
  const provider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser?.email){
        const user = {email : currentUser.email};
        axiosPublic.post("jwt", user)
        .then(res=> {
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token);
            
          }
        })
      }
      else{
        localStorage.removeItem('access-token');
      }
      
    });
    return () => {
      unsubscribe();
    };
  }, []);


  
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
    
  };
  const LogInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const LogInWIthGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const LogOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const AuthInfo = {
    user,
    setUser,
    createUser,
    LogInUser,
    LogInWIthGoogle,
    LogOutUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
