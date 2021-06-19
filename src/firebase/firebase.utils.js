import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyDPvK0DOHwmYJiaAj2HHXGGdgsrYp-0Pnc",
    authDomain: "crwn-db-28fb7.firebaseapp.com",
    projectId: "crwn-db-28fb7",
    storageBucket: "crwn-db-28fb7.appspot.com",
    messagingSenderId: "658922553117",
    appId: "1:658922553117:web:8f1133433d45d1b489ebf4",
    measurementId: "G-FR7FMLL1EB"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot);
    if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message);
        }
        
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;