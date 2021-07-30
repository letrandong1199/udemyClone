import { useLocation } from 'react-router-dom';

const useGetParameter = name => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    if (name) {
        return query.get(name);
    }
    else {
        return query;
    }
};


export default useGetParameter;