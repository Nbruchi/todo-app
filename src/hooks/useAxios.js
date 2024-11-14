import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (dataURL) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const getData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token,
                });
                if (isMounted) {
                    setData(response.data);
                    setError(null);
                }
            } catch (error) {
                if (isMounted) {
                    setData([]);
                    setError(error.message);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        getData(dataURL);

        return () => {
            isMounted = false;
            source.cancel();
        };
    }, [dataURL]);

    return { data, error, isLoading };
};

export default useAxios;
