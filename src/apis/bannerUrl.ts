const BASE_URL = import.meta.env.VITE_API_URL;

const bannerAPI = () => {
    return {
        create_banner               :       BASE_URL + "/banner",
        retrive_banner              :       BASE_URL + "/banner",
    }
}


export default { bannerAPI }