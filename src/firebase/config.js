import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: "AIzaSyC4DYGra6J2ONNKzwLYeA2L4a8b4pU_4Ds",
	authDomain: "myfinances-ed325.firebaseapp.com",
	projectId: "myfinances-ed325",
	storageBucket: "myfinances-ed325.appspot.com",
	messagingSenderId: "1047056690425",
	appId: "1:1047056690425:web:6668cc55d589d34a658628",
}

//init firebase
initializeApp(firebaseConfig)

//firestore database
const db = getFirestore()

//authentication
const auth = getAuth()

export {db, auth}