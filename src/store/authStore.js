
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setLoginSuccess: (user, token) => {
        // Sync to Cookies for Middleware (Visible to Server)
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('role', user.role, { expires: 7 });
        Cookies.set('user', JSON.stringify(user), { expires: 7 });

        set({ 
          user, 
          token, 
          isAuthenticated: true 
        });
      },

      logout: () => {
        // Clear Cookies and State
        Cookies.remove('token');
        Cookies.remove('role');
        
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
      },
      
      updateUser: (updatedUser) => set((state) => ({
        user: { ...state.user, ...updatedUser }
      }))
    }),
    {
      name: 'joepraise-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);