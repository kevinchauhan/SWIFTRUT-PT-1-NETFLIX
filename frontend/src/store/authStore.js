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

    signup: async (credentials) => {
        set({
            loadingStates: {
                ...get().loadingStates,
                signingUp: true,
            },
        });

        try {
            const { data } = await api.post("/auth/signup", credentials);
            set({
                currentUser: data.user,
                loadingStates: {
                    ...get().loadingStates,
                    signingUp: false,
                },
            });
            toast.success("Welcome! Account successfully created.");
        } catch (err) {
            const message = err?.response?.data?.message || "Signup failed. Please try again.";
            toast.error(message);
            set({
                loadingStates: {
                    ...get().loadingStates,
                    signingUp: false,
                },
            });
        }
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

    logout: async () => {
        set({
            loadingStates: {
                ...get().loadingStates,
                loggingOut: true,
            },
        });

        try {
            await api.post("/auth/logout");
            set({
                currentUser: null,
                loadingStates: {
                    ...get().loadingStates,
                    loggingOut: false,
                },
            });
            toast.success("You have been logged out.");
        } catch (err) {
            const message = err?.response?.data?.message || "Logout failed. Try again later.";
            toast.error(message);
            set({
                loadingStates: {
                    ...get().loadingStates,
                    loggingOut: false,
                },
            });
        }
    },

    verifyAuth: async () => {
        set({
            loadingStates: {
                ...get().loadingStates,
                checkingAuth: true,
            },
        });

        try {
            const { data } = await api.get("/auth/authCheck");
            set({
                currentUser: data.user,
                loadingStates: {
                    ...get().loadingStates,
                    checkingAuth: false,
                },
            });
        } catch {
            set({
                currentUser: null,
                loadingStates: {
                    ...get().loadingStates,
                    checkingAuth: false,
                },
            });
        }
    },
}));
