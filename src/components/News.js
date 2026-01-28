import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // 🔹 Initial news load
  const updateNews = async () => {
    try {
      props.setProgress(10);
      setLoading(true);
      setError(null);

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;

      const response = await fetch(url);
      props.setProgress(30);

      if (!response.ok) {
        if (response.status === 426) {
          throw new Error("Invalid or expired News API key.");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const parsedData = await response.json();
      props.setProgress(70);

      if (parsedData.status === "error") {
        throw new Error(parsedData.message);
      }

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setPage(1);

      props.setProgress(100);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Infinite scroll loader
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

      setPage(nextPage);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const parsedData = await response.json();

      setArticles((prevArticles) =>
        prevArticles.concat(parsedData.articles || [])
      );
      setTotalResults(parsedData.totalResults || 0);
    } catch (err) {
      console.error("Error loading more news:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(
      props.category
    )} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 className="text-center" style={{ margin: "90px 0 35px" }}>
        aapki news – Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source?.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
