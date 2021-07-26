import { useLocation } from 'react-router-dom';


const useGetParameter = name => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    return query.get(name);
};

export default useGetParameter;