const BASE_URL = import.meta.env.VITE_API_URL;

const partnerAPI = (_id?: string) => {
    return {
        create_partner:                BASE_URL + "/partner",
        retrive_partner:               BASE_URL + "/partner?limit=" + 200 + "&page=" + 1,
        update_partner:                BASE_URL + "/partner",
        delete_partner:                BASE_URL + "/partner/" + _id
    }
}


export default { partnerAPI }