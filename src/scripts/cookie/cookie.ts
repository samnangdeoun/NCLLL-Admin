export const getCookie = (name: string): string | null => {
    const cookie = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return cookie ? decodeURIComponent(cookie[2]) : null;
};

export const setCookie = (name: string, token: string,): void => {
    document.cookie = `${name}=${token};`;
};

export const removeCookie = (name: string): void => {
    document.cookie = `${name}=;`;
};