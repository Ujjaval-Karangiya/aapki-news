import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // ?? Fetch initial news
    const updateNews = async () => {

        try {

            props.setProgress(10);
            setLoading(true);

            const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&country=${props.country}&category=${props.category}`;

            let data = await fetch(url);
            props.setProgress(30);

            let parsedData = await data.json();
            props.setProgress(70);

            console.log(parsedData);

            setArticles(Array.isArray(parsedData.results) ? parsedData.results : []);
            setNextPage(parsedData.nextPage || null);

            setLoading(false);
            props.setProgress(100);

        } catch (error) {
            console.error("Error fetching news:", error);
            setArticles([]);
            setLoading(false);
        }
    };

    // ?? Load more (infinite scroll)
    const fetchMoreData = async () => {

        try {

            if (!nextPage) return;

            const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&country=${props.country}&category=${props.category}&page=${nextPage}`;

            let data = await fetch(url);
            let parsedData = await data.json();

            console.log(parsedData);

            setArticles((prev) =>
                prev.concat(Array.isArray(parsedData.results) ? parsedData.results : [])
            );

            setNextPage(parsedData.nextPage || null);

        } catch (error) {
            console.error("Error loading more news:", error);
        }
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - News App`;
        updateNews();

        // eslint-disable-next-line
    }, [props.category]);

    return (
        <>
            <h1 className="text-center" style={{ marginTop: '90px', marginBottom: '30px' }}>
                Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>

            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={nextPage !== null}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">

                        {articles.map((element, index) => (
                            <div className="col-md-4" key={index}>
                                <NewsItem
                                    title={element.title || ""}
                                    description={element.description || ""}
                                    imageUrl={element.image_url || ""}
                                    newsUrl={element.link || ""}
                                    author={element.creator?.[0] || "Unknown"}
                                    date={element.pubDate || ""}
                                    source={element.source_id || ""}
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
    country: 'us',
    pageSize: 8,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
    setProgress: PropTypes.func
};

export default News;