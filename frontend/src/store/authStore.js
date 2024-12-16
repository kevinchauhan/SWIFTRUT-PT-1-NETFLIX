import { toast } from "react-hot-toast";
import { create } from "zustand";
import { api } from "../http/client";

export const useAuthStore = create((set, get) => ({
    currentUser: null,
    loadingStates: {
        signingUp: false,
        checkingAuth: false,
        loggingIn: false,
        loggingOut: false,
    },



    login: async (credentials) => {
        set({
            loadingStates: {
                ...get().loadingStates,
                loggingIn: true,
            },
        });

        try {
            const { data } = await api.post("/auth/login", credentials);
            set({
                currentUser: data.user,
                loadingStates: {
                    ...get().loadingStates,
                    loggingIn: false,
                },
            });
            toast.success("Logged in successfully.");
        } catch (err) {
            const message = err?.response?.data?.message || "Login failed. Check your credentials.";
            toast.error(message);
            set({
                loadingStates: {
                    ...get().loadingStates,
                    loggingIn: false,
                },
            });
        }
    },

}));
