import { useMutation } from '@tanstack/react-query';
import { authenticate } from '../api/auth';

export const useAuth = () => {
    return useMutation({
        mutationFn: authenticate,
        onSuccess: (data) => {
            localStorage.setItem('authToken', data.token);
            console.log(data)
            console.log('Authenticated successfully, token stored:', data.token);
        },
        onError: (error: Error) => {
            console.error('Authentication failed:', error.message);
        },
    });
};
