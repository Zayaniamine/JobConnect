import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Carousel() {
  const [newsItems, setNewsItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything?q=bitcoin&apiKey=bdd69cb4ec514d50bce4db0f107df2f4');
        setNewsItems(response.data.articles);
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
            key={index}
            className={`duration-700 ease-in-out ${index === activeIndex ? 'block' : 'hidden'}`}
            data-carousel-item
          >
            <img
              src={item.urlToImage}
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
