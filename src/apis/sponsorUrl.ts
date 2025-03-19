const BASE_URL = import.meta.env.VITE_API_URL;

const sponsorAPI = () => {
    return {
        create_sponsor:          BASE_URL + "/sponsor",
    }
}


export default { sponsorAPI }