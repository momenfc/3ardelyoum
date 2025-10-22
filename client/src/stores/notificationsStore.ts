import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

interface NotificationsState {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  unreadCount: () => number;
}

export const useNotificationsStore = create<NotificationsState>(set => ({
  notifications: [],
  setNotifications: notifications => set({ notifications }),
  addNotification: notification => set(state => ({ notifications: [...state.notifications, notification] })),
  markAsRead: id => set(state => ({ notifications: state.notifications.map(n => (n.id === id ? { ...n, read: true } : n)) })),
  unreadCount: function () {
    // @ts-ignore
    return this.notifications.filter(n => !n.read).length;
  },
}));
