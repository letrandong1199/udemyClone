import { useLocation } from 'react-router-dom';

const useGetParameter = (name, all) => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    if (name) {
        return query.get(name);
    }
    else if (all) {
        return query.getAll(name);
    }
    else {
        return query;
    }
};


export default useGetParameter;