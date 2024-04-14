import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LatestNews() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsdata.io/api/1/news?country=tn&category=business&apikey=pub_41355618f4e2fe5bcfac32fadc1327ccb0d68');
        // Adjusted to match the provided JSON structure
        setNewsItems(response.data.results); // Updated from response.data.articles to response.data.results
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
    {newsItems.map((item) => (
      <div key={item.article_id || item.title} className="card w-96 bg-base-100 shadow-xl flex flex-col">
        <figure>
          <img src={item.image_url || "https://via.placeholder.com/400"} alt={item.title} />
        </figure>
        <div className="card-body flex flex-col flex-grow">
          <h2 className="card-title">{item.title}</h2>
          <p className="flex-grow  leading-snug overflow-ellipsis overflow-hidden max-h-1">{item.description}</p> {/* Ensures description takes up available space, pushing the button down */}
          <div className="card-actions justify-end mt-auto"> {/* mt-auto pushes this div to the bottom */}
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  );
}

export default LatestNews;
