import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
interface Request {
    id: number;
    name: string;
    date: string;
    amount: string;

}
interface FetchRequestsResponse {
    count: number;
    results: Request[];
}


const useRequests = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [error, setError] = useState('');

    useEffect(() =>{
        const controller = new AbortController();
        apiClient.get<FetchRequestsResponse>('/pickup-requests', { signal: controller.signal })
            .then(response => setRequests(response.data.results))
            .catch(error => {
                if (error instanceof CanceledError) return;
                setError(error.message)
            });
            return () => controller.abort();
    }, []);

    return { requests, error };


}