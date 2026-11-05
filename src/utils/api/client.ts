const API_URL = import.meta.env.VITE_API_URL ?? '';
const COMPLETE_API_URL = `${API_URL}/api/`;

const lireCookie = (nom: string): string | null => {
    const trouve = document.cookie.split('; ').find(c => c.startsWith(nom + '='));
    return trouve ? decodeURIComponent(trouve.split('=')[1]) : null;
};

export const appeler = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers);
    const jeton = lireCookie('XSRF-TOKEN');
    if (jeton) headers.set('X-XSRF-TOKEN', jeton);
    return fetch(`${COMPLETE_API_URL}${url}`, { ...options, headers, credentials: 'include' });
};

export const lireJson = async <T>(reponse: Response): Promise<T> => {
    if (!reponse.ok) {
        const erreur = await reponse.json().catch(() => null);
        throw new Error(erreur?.message ?? 'Une erreur est survenue.');
    }
    return reponse.json();
};