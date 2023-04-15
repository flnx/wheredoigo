export function getToken() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData?.accessToken;
    return token ? `Bearer ${token}` : null;
}
