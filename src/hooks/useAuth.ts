import { useMutation } from "@tanstack/react-query";
import { authenticate } from "../api/auth";
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const { setToken } = useAuthContext();
    return useMutation({
        mutationFn: authenticate,
        onSuccess: (data) => {
            console.log("Authenticated successfully, token stored:", data);
            setToken(data);
        },
        onError: (error: Error) => {
            console.error("Authentication failed:", error.message);
        },
    });
};
