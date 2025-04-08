const BASE_URL = import.meta.env.VITE_API_URL;

const authAPI = () => {
    return {
        user_login               :       BASE_URL + "/auth/login",
        file_upload              :       BASE_URL + "/upload",
        maintainence             :       BASE_URL + "/settings",
    }
}


export default { authAPI }