// components/Search.js
import React, { useState } from 'react';
import NewsItem from './NewsItem';

const dummyData = [
  {
    title: "India Wins Cricket World Cup",
    description: "Historic win by India against Australia.",
    imageUrl: "",
    newsUrl: "#",
    author: "BBC",
    date: "2025-07-20",
    source: "BBC News"
  },
  {
    title: "NASA Launches New Rocket",
    description: "A new era in space exploration begins.",
    imageUrl: "",
    newsUrl: "#",
    author: "NASA",
    date: "2025-07-18",
    source: "NASA"
  }
];

const Search = () => {
  const [query, setQuery] = useState('');

  const filtered = dummyData.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container" style={{ marginTop: '90px' }}>
      <h2 className="text-center my-3">Search News</h2>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Type to search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="row">
        {filtered.map((item, index) => (
          <div className="col-md-4" key={index}>
            <NewsItem
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              newsUrl={item.newsUrl}
              author={item.author}
              date={item.date}
              source={item.source}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
