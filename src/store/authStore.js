// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import Cookies from 'js-cookie';
// import api from '@/api/axios';

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       refreshToken: null,
//       isAuthenticated: false, 
//       authLoading: true, // NEW

//       setLoginSuccess: (user, token, refreshToken = null) => {
//         // Sync to Cookies for Middleware (Visible to Server)
//         Cookies.set('token', token, { expires: 7 });
//         Cookies.set('role', user.role, { expires: 7 });
//         Cookies.set('user', JSON.stringify(user), { expires: 7 });

//         set({ 
//             user,
//             token,
//             refreshToken,
//             isAuthenticated: true,
//         });
//       },

//     setAccessToken: (token) => {
//         Cookies.set('token', token, { expires: 7 });

//         set((state) => ({
//           ...state,
//           token,
//           isAuthenticated: true
//         }));
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
//         }finally {
//           set({
//             authLoading: false,
//           });
//         }
//       },

//       logout: () => {
//         // Clear Cookies and State
//         Cookies.remove('token');
//         Cookies.remove('role');
//         Cookies.remove('user');

//         localStorage.removeItem("admin-dashboard");
        
//         set({ 
//           user: null, 
//           token: null, 
//           refreshToken: null,
//           isAuthenticated: false,
//           authLoading: false,
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

const serverStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

const getStorage = () =>
  typeof window === "undefined" ? serverStorage : window.localStorage;

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false, 
      authLoading: true,

      setLoginSuccess: (user, token, refreshToken = null) => {
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('role', user.role, { expires: 7 });
        Cookies.set('user', JSON.stringify(user), { expires: 7 });

        set({ 
            user,
            token,
            refreshToken,
            isAuthenticated: true,
        });

        // NEW: the guest cart (if any) was merged server-side during this
        // login/verify-email request via the x-guest-id header. Clear the
        // now-stale guest identity and refresh the cart so the UI reflects
        // the merged result immediately.
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("joepraise-guest-id");
        }

        import("@/store/cartStore").then(({ useCartStore }) => {
          useCartStore.getState().fetchCart();
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
        }finally {
          set({
            authLoading: false,
          });
        }
      },

      logout: () => {
        Cookies.remove('token');
        Cookies.remove('role');
        Cookies.remove('user');

        if (typeof window !== "undefined") {
          window.localStorage.removeItem("admin-dashboard");
        }
        
        set({ 
          user: null, 
          token: null, 
          refreshToken: null,
          isAuthenticated: false,
          authLoading: false,
        });
      },
      
      updateUser: (updatedUser) => set((state) => ({
        user: { ...state.user, ...updatedUser }
      }))
    }),
    {
      name: 'joepraise-auth-storage',
      storage: createJSONStorage(getStorage),
    }
  )
);
