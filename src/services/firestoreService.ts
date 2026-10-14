import { collection, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Business } from '../types';

const COLLECTION = 'comerciantes';

export const firestoreService = {
  // Buscar todos
  async getAll(): Promise<Business[]> {
    const snapshot = await getDocs(collection(db, COLLECTION));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Business));
  },

  async getById(id: string): Promise<Business | null> {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Business;
    }
    return null;
  },

  // Adicionar novo
  async add(data: Omit<Business, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION), data);
    return docRef.id;
  },

  // Atualizar
  async update(id: string, data: Partial<Business>): Promise<void> {
    await updateDoc(doc(db, COLLECTION, id), data);
  },

  // Remover
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTION, id));
  }
};