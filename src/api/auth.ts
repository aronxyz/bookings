export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

const authUrl = "https://restful-booker.herokuapp.com/auth"

export const authenticate = async (data: AuthRequest): Promise<AuthResponse> => {
    const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Authentication failed');
    }

    return response.json();
}