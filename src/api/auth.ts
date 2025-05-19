export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

const authUrl = "/auth"


export const authenticate = async (data: AuthRequest): Promise<AuthResponse> => {
    const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok && responseData.reason && responseData.reason === "Bad credentials") {
        throw new Error('Authentication failed: Bad credentials');
    }

    if (!response.ok) {
        throw new Error(`Authentication failed: ${responseData?.reason || 'Unknown error'}`);
    }

    return responseData;
};
