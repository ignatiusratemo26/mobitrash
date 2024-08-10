import { useState, useEffect } from "react";
import { CanceledError } from "axios";
import api from "../services/api";
import useAuth from "./useAuth";
interface Request {
    id: number;
    user_email: string;
    request_date: string;
    amount_due: number;

}
interface FetchRequestsResponse {
    count: number;
    results: Request[];
}


const useRequests = () => {
    const { token } = useAuth();
    const [requests, setRequests] = useState<Request[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false)

    useEffect(() =>{
        const controller = new AbortController();

        setLoading(true);
        if (!token) {
            console.log('No token found');
            return;
        }
        console.log('Retrieved token:', token);
        api.get<FetchRequestsResponse>('/pickup-api/admin/pickup-list/', {
            headers: { Authorization: `Bearer ${token}` }, 
            signal: controller.signal })
            .then(response => {
                setRequests(response.data.results);
                setLoading(false);
            })
            .catch(error => {
                if (error instanceof CanceledError) return;
                setError(error.message);
                setLoading(false);
            });
            return () => controller.abort();
    }, []);

    return { requests, error, isLoading };


}
export default useRequests;