// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc, setDoc, getFirestore,collection,writeBatch,query,getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCeIKwz83PmwjWvDazUWr5UT6HU9zKR0kY',
  authDomain: 'clothing-db-97f36.firebaseapp.com',
  projectId: 'clothing-db-97f36',
  storageBucket: 'clothing-db-97f36.appspot.com',
  messagingSenderId: '689688198820',
  appId: '1:689688198820:web:c28fe72b267bc8522e7031',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account',
})
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore()

// export const addCollectionAndDocuments = async(collectionKey,objectsToAdd)=>{
// const collectionRef = collection(db,collectionKey)
//   const batch =writeBatch(db);

//   objectsToAdd.forEach((object)=>{
//     const docRef = doc(collectionRef,object.title.toLowerCase());
//     batch.set(docRef,object)
//   })
//   await batch.commit();
//   console.log('done')
// }
export const getCategoriesAndDocuments= async()=>{
  const collectionRef = collection(db,'categories')
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc,docSnapShot)=>{
    const {title,items}=docSnapShot.data();
  acc[title.toLowerCase()]=items;
  return acc;
  },{});
  return categoryMap
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!auth) return
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser=async()=>await signOut(auth);

export const onAuthStateChangedListener = (callback)=>{
   onAuthStateChanged(auth,callback)
}