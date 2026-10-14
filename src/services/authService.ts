import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User 
} from 'firebase/auth';

    // Certifique-se de exportar o 'app' do seu config
import { app } from './firebaseConfig'; 

const auth = getAuth(app);

export const authService = {
  async signUp
    (email: string, 
    password: string): Promise<User> {
    const userCredential = await
     createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async logOut(): Promise<void> {
    await signOut(auth);
  }
};