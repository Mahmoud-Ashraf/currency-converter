import { useCallback, useState } from "react";

const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = useCallback(async (requestConfig, applyData, applyError) => {
        setIsLoading(true);
        setError(null);
        // let contentTypeHeader = requestConfig.method === 'POST' ? { 'Content-Type': 'application/json' } : {};
        let baseUrl = process.env.REACT_APP_BASE_API_URL;
        let apiKey = process.env.REACT_APP_API_KEY;
        let apiKeyUrl = `?access_key=${apiKey}`;
        if (requestConfig.url.includes('?')) {
            apiKeyUrl = `&access_key=${apiKey}`;
        }
        try {
            const response = await fetch(
                baseUrl + requestConfig.url + apiKeyUrl,
                {
                    method: requestConfig.method,
                    // headers: { ...contentTypeHeader, ...requestConfig.headers },
                    // headers: { ...requestConfig.headers },
                    // body: (contentTypeHeader && contentTypeHeader['Content-Type'] === 'application/json') ? JSON.stringify(requestConfig.body) : requestConfig.body
                }
            );

            const data = await response.json();
            console.log(data);
            if (!data.success) {
                throw new Error(`${data.error.type}`);
            }
            applyData(data);
        } catch (err) {
            setError(err.message);
            applyError(err.message);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHTTP;