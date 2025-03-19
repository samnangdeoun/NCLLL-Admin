const BASE_URL = import.meta.env.VITE_API_URL;

const positionAPI = () => {
    return {
        create_position:          BASE_URL + "/position",
    }
}


export default { positionAPI }