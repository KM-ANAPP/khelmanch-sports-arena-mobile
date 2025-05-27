
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/utils/firestore';

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Timestamp;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: {
    text: string;
    timestamp: Timestamp;
    senderId: string;
  };
  createdAt: Timestamp;
}

export interface ConnectionRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Timestamp;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  sports: string[];
  location: string;
  createdAt: Timestamp;
}

class FirestoreService {
  // User Management
  async createUser(userId: string, userData: Omit<UserProfile, 'id' | 'createdAt'>) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp()
    });
  }

  async getUser(userId: string): Promise<UserProfile | null> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as UserProfile;
    }
    return null;
  }

  // Chat Management
  async createChat(participants: string[]): Promise<string> {
    const chatRef = await addDoc(collection(db, 'chats'), {
      participants,
      createdAt: serverTimestamp()
    });
    return chatRef.id;
  }

  async sendMessage(chatId: string, senderId: string, text: string) {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    await addDoc(messagesRef, {
      senderId,
      text,
      timestamp: serverTimestamp()
    });

    // Update last message in chat
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      lastMessage: {
        text,
        timestamp: serverTimestamp(),
        senderId
      }
    });
  }

  // Real-time message listener
  subscribeToMessages(chatId: string, callback: (messages: ChatMessage[]) => void) {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      callback(messages);
    });
  }

  // Get user's chats
  async getUserChats(userId: string): Promise<Chat[]> {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Chat[];
  }

  // Connection Requests
  async sendConnectionRequest(senderId: string, receiverId: string): Promise<string> {
    const requestRef = await addDoc(collection(db, 'connectionRequests'), {
      senderId,
      receiverId,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return requestRef.id;
  }

  async respondToConnectionRequest(requestId: string, status: 'accepted' | 'rejected') {
    const requestRef = doc(db, 'connectionRequests', requestId);
    await updateDoc(requestRef, { status });

    if (status === 'accepted') {
      // Create a chat between the users
      const requestSnap = await getDoc(requestRef);
      if (requestSnap.exists()) {
        const data = requestSnap.data();
        await this.createChat([data.senderId, data.receiverId]);
      }
    }
  }

  async getUserConnectionRequests(userId: string): Promise<ConnectionRequest[]> {
    const requestsRef = collection(db, 'connectionRequests');
    const q = query(
      requestsRef, 
      where('receiverId', '==', userId),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ConnectionRequest[];
  }

  // Check if connection already exists
  async checkExistingConnection(senderId: string, receiverId: string): Promise<boolean> {
    const requestsRef = collection(db, 'connectionRequests');
    const q = query(
      requestsRef,
      where('senderId', '==', senderId),
      where('receiverId', '==', receiverId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }
}

export const firestoreService = new FirestoreService();
