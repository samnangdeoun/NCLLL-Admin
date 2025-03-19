const BASE_URL = import.meta.env.VITE_API_URL;

const memberAPI = () => {
    return {
        create_member               :       BASE_URL + "/position",
    }
}


export default { memberAPI }