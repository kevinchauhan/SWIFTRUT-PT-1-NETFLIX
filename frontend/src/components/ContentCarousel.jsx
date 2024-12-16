/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/contentStore";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../http/client";

const ContentCarousel = ({ category }) => {
    const { contentType } = useContentStore();
    const [items, setItems] = useState([]);
    const [arrowsVisible, setArrowsVisible] = useState(false);

    const carouselRef = useRef(null);

    const formattedCategory = category.replaceAll("_", " ");
    const categoryDisplayName = formattedCategory[0].toUpperCase() + formattedCategory.slice(1);
    const contentDisplayType = contentType === "movie" ? "Movies" : "TV Shows";

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.get(`/api/${contentType}/${category}`);
                setItems(response.data.content.results);
            } catch (error) {
                console.error("Failed to fetch content:", error);
            }
        };

        fetchItems();
    }, [contentType, category]);

    const scrollLeftHandler = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    const scrollRightHandler = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    return (
        <div
            className='bg-black text-white relative px-5 md:px-20'
            onMouseEnter={() => setArrowsVisible(true)}
            onMouseLeave={() => setArrowsVisible(false)}
        >
            <h2 className='mb-4 text-2xl font-bold'>
                {categoryDisplayName} {contentDisplayType}
            </h2>

            <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={carouselRef}>
                {items?.map((contentItem) => (
                    <Link to={`/watch/${contentItem.id}`} className='min-w-[250px] relative group' key={contentItem.id}>
                        <div className='rounded-lg overflow-hidden'>
                            <img
                                src={SMALL_IMG_BASE_URL + contentItem.backdrop_path}
                                alt={contentItem.title || contentItem.name}
                                className='transition-transform duration-300 ease-in-out group-hover:scale-125'
                            />
                        </div>
                        <p className='mt-2 text-center'>{contentItem.title || contentItem.name}</p>
                    </Link>
                ))}
            </div>

            {arrowsVisible && (
                <>
                    <button
                        className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
                        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                        onClick={scrollLeftHandler}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
                        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                        onClick={scrollRightHandler}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
};

export default ContentCarousel;
