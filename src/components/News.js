import React, { useEffect, useState } from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
const updateNews = async () => {
  try {
    props.setProgress(10);
    setLoading(true);

    const url = `https://gnewsapi.io/api/v4/top-headlines?country=${props.country}&topic=${props.category}&token=${props.apiKey}&page=${page}&max=${props.pageSize}`;

    const response = await fetch(url);
    props.setProgress(30);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const parsedData = await response.json();
    props.setProgress(70);

    setArticles(parsedData.articles || []);
    props.setProgress(100);
  } catch (error) {
    console.error("Error fetching news:", error);
  } finally {
    setLoading(false);
  }
};


    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
        // eslint-disable-next-line
    }, [])


   const fetchMoreData = async () => {
  try {
    const nextPage = page + 1;

    const url = `https://gnewsapi.io/api/v4/top-headlines?country=${props.country}&topic=${props.category}&token=${props.apiKey}&page=${nextPage}&max=${props.pageSize}`;

    setPage(nextPage);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const parsedData = await response.json();

    setArticles((prevArticles) =>
      prevArticles.concat(parsedData.articles || [])
    );
  } catch (error) {
    console.error("Error fetching more news:", error);
  }
};



    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>aapki - news - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            {/* <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                >  */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < 100}
                loader={<Spinner />}
            />

            <div className="container">

                <div className="row">
                    {articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
            </div>
        </InfiniteScroll >
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;