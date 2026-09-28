import { ProjectEnquiry, ContactMessage, EnquiryStatus } from '../types';
import { INITIAL_DEMO_ENQUIRIES } from '../data/companyData';

const ENQUIRIES_KEY = 'softwaredeveloper077_enquiries_v1';
const MESSAGES_KEY = 'softwaredeveloper077_messages_v1';

// In-memory fallback in case localStorage is blocked in sandboxed iframe
let memoryEnquiries: ProjectEnquiry[] = [...INITIAL_DEMO_ENQUIRIES];
let memoryMessages: ContactMessage[] = [];

const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

export const storageService = {
  getEnquiries(): ProjectEnquiry[] {
    if (!isStorageAvailable()) {
      return memoryEnquiries;
    }
    try {
      const stored = localStorage.getItem(ENQUIRIES_KEY);
      if (!stored) {
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(INITIAL_DEMO_ENQUIRIES));
        return INITIAL_DEMO_ENQUIRIES;
      }
      return JSON.parse(stored);
    } catch {
      return memoryEnquiries;
    }
  },

  saveEnquiry(enquiry: Omit<ProjectEnquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt'>): ProjectEnquiry {
    const list = this.getEnquiries();
    const count = list.length + 104;
    const newRecord: ProjectEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      referenceNumber: `DEV077-REQ-${count}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    const updated = [newRecord, ...list];
    memoryEnquiries = updated;
    if (isStorageAvailable()) {
      try {
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not persist to localStorage:', e);
      }
    }
    return newRecord;
  },

  updateEnquiryStatus(id: string, status: EnquiryStatus, notes?: string): ProjectEnquiry[] {
    const list = this.getEnquiries();
    const updated = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status,
          notes: notes !== undefined ? notes : item.notes,
        };
      }
      return item;
    });
    memoryEnquiries = updated;
    if (isStorageAvailable()) {
      try {
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not persist to localStorage:', e);
      }
    }
    return updated;
  },

  deleteEnquiry(id: string): ProjectEnquiry[] {
    const list = this.getEnquiries().filter((item) => item.id !== id);
    memoryEnquiries = list;
    if (isStorageAvailable()) {
      try {
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(list));
      } catch (e) {
        console.warn('Could not persist to localStorage:', e);
      }
    }
    return list;
  },

  getMessages(): ContactMessage[] {
    if (!isStorageAvailable()) {
      return memoryMessages;
    }
    try {
      const stored = localStorage.getItem(MESSAGES_KEY);
      if (!stored) return [];
      return JSON.parse(stored);
    } catch {
      return memoryMessages;
    }
  },

  saveMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): ContactMessage {
    const list = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newMsg, ...list];
    memoryMessages = updated;
    if (isStorageAvailable()) {
      try {
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not persist to localStorage:', e);
      }
    }
    return newMsg;
  },

  resetDemoData(): ProjectEnquiry[] {
    memoryEnquiries = [...INITIAL_DEMO_ENQUIRIES];
    if (isStorageAvailable()) {
      try {
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(INITIAL_DEMO_ENQUIRIES));
      } catch (e) {
        console.warn('Could not persist to localStorage:', e);
      }
    }
    return INITIAL_DEMO_ENQUIRIES;
  },
};
