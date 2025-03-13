const BASE_URL = import.meta.env.VITE_API_URL;

const authAPI = () => {
    return {
        login               :       BASE_URL + "/auth/login",
    }
}


export default { authAPI }