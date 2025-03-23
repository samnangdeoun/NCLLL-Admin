const BASE_URL = import.meta.env.VITE_API_URL;

const bannerAPI = (_id: string) => {
    return {
        create_banner               :       BASE_URL + "/banner",
        retrive_banner              :       BASE_URL + "/banner",
        delete_banner               :       BASE_URL + "/banner/" + _id,
    }
}


export default { bannerAPI }