import { useEffect, useState } from 'react';

const useFetch = (from) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const abortController = new AbortController();
        setTimeout(() => {

            fetch(from)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch data from server (categories)');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('Fetch aborted');
                    }
                    setError(error.message);
                    setIsPending(false);
                })
        }, 0);
        return () => abortController;

    }, [from]);
    return { data, isPending, error };
};
export default useFetch;