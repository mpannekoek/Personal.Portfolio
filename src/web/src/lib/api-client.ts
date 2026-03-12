export class ApiClientError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiClientError";
        this.status = status;
    }
}

export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(path, {
        ...init,
        headers: {
            Accept: "application/json",
            ...(init?.headers ?? {}),
        },
    });

    if (!response.ok) {
        throw new ApiClientError(`Request failed for "${path}"`, response.status);
    }

    return (await response.json()) as T;
}
