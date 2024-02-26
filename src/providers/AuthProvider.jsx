import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";



export const AuthContext = createContext(null)

const auth = getAuth(app);

const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(null);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	}

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	}

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	}


	const updateUserProfile = (name, image) => {
		return updateProfile(auth.currentUser, {
			displayName: name, photoURL: image
		})
	}


	useEffect( () => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
			console.log('Current User', user);
			setLoading(false);
		})
		return () => {
			return unsubscribe;
		}
	},[user])

	const authInfo = {
		user,
		loading,
		createUser,
		signIn,
		logOut,
		updateUserProfile
	}
	return (
		<AuthContext.Provider value={authInfo}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;