import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCREA25TB36seUA6vjyPiD0-RBW0ak0mZE',
  authDomain: 'api-de-peliculas.firebaseapp.com',
  projectId: 'api-de-peliculas',
  storageBucket: 'api-de-peliculas.appspot.com',
  messagingSenderId: '150497950596',
  appId: '1:150497950596:web:725633c8d272bd35d37bd1',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default auth
