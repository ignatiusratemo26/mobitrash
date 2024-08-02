import axios from "axios";

export default axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
    
    });


    // params: {
        // key: 'd20987e635c14954bdff810d394797e1',
        // key: ''
    // },