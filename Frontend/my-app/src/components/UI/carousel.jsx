import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Carousel() {
  const [newsItems, setNewsItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Updated API call to match the LatestNews component
        const response = await axios.get('https://newsdata.io/api/1/news?country=tn&category=business&apikey=pub_41355618f4e2fe5bcfac32fadc1327ccb0d68');
        setNewsItems(response.data.results); // Ensure this matches the response structure
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {newsItems.map((item, index) => (
          <div
            key={item.article_id || index}
            className={`duration-700 ease-in-out ${index === activeIndex ? 'block' : 'hidden'}`}
            data-carousel-item
          >
            <img
              src={item.image_url || "https://via.placeholder.com/400"}
              className="absolute block w-full h-full object-cover object-center"
              alt={item.title}
            />
            <div className="absolute inset-0 bg-black/30 flex justify-center items-center p-4">
              <p className="text-white text-center">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {newsItems.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 p-2"
          >
            Prev
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/50 p-2"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}

export default Carousel;
