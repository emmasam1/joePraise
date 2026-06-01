
// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import Cookies from 'js-cookie';

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,

//       setLoginSuccess: (user, token) => {
//         // Sync to Cookies for Middleware (Visible to Server)
//         Cookies.set('token', token, { expires: 7 });
//         Cookies.set('role', user.role, { expires: 7 });
//         Cookies.set('user', JSON.stringify(user), { expires: 7 });

//         set({ 
//           user, 
//           token, 
//           isAuthenticated: true 
//         });
//       },

//      getMe: async () => {
//         try {
//           const { data } = await api.get("/auth/me");

//           if (data?.success) {
//             Cookies.set(
//               "user",
//               JSON.stringify(data.user),
//               { expires: 7 }
//             );

//             Cookies.set(
//               "role",
//               data.user.role,
//               { expires: 7 }
//             );

//             set({
//               user: data.user,
//               isAuthenticated: true
//             });
//           }
//         } catch (error) {
//           console.error("Get Me Error:", error);
//         }
//       },

//       logout: () => {
//         // Clear Cookies and State
//         Cookies.remove('token');
//         Cookies.remove('role');
//         Cookies.remove('user');
        
//         set({ 
//           user: null, 
//           token: null, 
//           isAuthenticated: false 
//         });
//       },
      
//       updateUser: (updatedUser) => set((state) => ({
//         user: { ...state.user, ...updatedUser }
//       }))
//     }),
//     {
//       name: 'joepraise-auth-storage',
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );



import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import api from '@/api/axios';

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

    setAccessToken: (token) => {
        Cookies.set('token', token, { expires: 7 });

        set((state) => ({
          ...state,
          token,
          isAuthenticated: true
        }));
      },

     getMe: async () => {
        try {
          const { data } = await api.get("/auth/me");

          if (data?.success) {
            Cookies.set(
              "user",
              JSON.stringify(data.user),
              { expires: 7 }
            );

            Cookies.set(
              "role",
              data.user.role,
              { expires: 7 }
            );

            set({
              user: data.user,
              isAuthenticated: true
            });
          }
        } catch (error) {
          console.error("Get Me Error:", error);
        }
      },

      logout: () => {
        // Clear Cookies and State
        Cookies.remove('token');
        Cookies.remove('role');
        Cookies.remove('user');
        
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