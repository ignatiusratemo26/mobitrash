import { useNavigate } from "react-router-dom";


const useRequestView = () => {
    const navigate = useNavigate();
    const handleView = (id: number | null) => {
        console.log(id);
        navigate(`/pickup-requests/${id}`);
    };
    return handleView;
    
};
export default useRequestView;