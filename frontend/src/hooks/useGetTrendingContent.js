import { useEffect, useState } from "react";
import { useContentStore } from "../store/contentStore";
import { api } from "../http/client";

const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null);
    const { contentType } = useContentStore();

    useEffect(() => {
        const getTrendingContent = async () => {
            const res = await api.get(`/api/${contentType}/trending`);
            setTrendingContent(res.data.content);
        };

        getTrendingContent();
    }, [contentType]);

    return { trendingContent };
};
export default useGetTrendingContent;