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

    // Parse the response as JSON
    const responseData = await response.json();

    // Check for a specific failure condition, even if the status is 200
    if (response.ok && responseData.reason && responseData.reason === "Bad credentials") {
        throw new Error('Authentication failed: Bad credentials');
    }

    // If response is not ok (e.g., other status codes), throw an error
    if (!response.ok) {
        throw new Error(`Authentication failed: ${responseData?.reason || 'Unknown error'}`);
    }

    // If no issues, return the parsed data (which should be the token)
    return responseData;
};
