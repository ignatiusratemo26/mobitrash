import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { set } from "react-hook-form";
import api from "../services/api";
import { Request } from "../types/Request";

const useRequest = (requestId: number | null) => {
    const { token } = useAuth();
    const [error, setError] = useState('');
    const [ request, setRequest ] = useState<Request | null>(null);
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        if(!requestId) {
            return;
        };
            
        if(!token) {
            const controller = new AbortController();
            setLoading(true);
            return;
        }
        api.get<Request>(`/pickup-api/pickup-requests/${requestId}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            
            setRequest(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [requestId, token]);
    return {
        request,
        error,
        isLoading      
    };

}
export default useRequest;