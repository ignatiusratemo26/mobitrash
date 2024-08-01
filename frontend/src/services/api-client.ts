import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api/",
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        // key: 'd20987e635c14954bdff810d394797e1',
        // key: ''
    },
    });