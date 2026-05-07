import React from "react";

const NewsItem = ({
    title,
    description,
    imageUrl,
    newsUrl,
    author,
    date,
    source,
}) => {
    return (
        <div className=" d-flex">
            <div
                className="card my-3 shadow-sm w-100"
                style={{
                    height: "500px", // Fixed card height
                }}
            >
                {/* Source Badge */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        right: 0,
                        zIndex: 1,
                    }}
                >
                    <span className="badge rounded-pill bg-danger m-2">
                        {source}
                    </span>
                </div>

                {/* Image */}
                <img
                    src={
                        imageUrl ||
                        "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
                    }
                    className="card-img-top"
                    alt="news"
                    style={{
                        height: "200px", // Same image size
                        objectFit: "cover",
                    }}
                />

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        {title
                            ? title.length > 60
                                ? title.slice(0, 60) + "..."
                                : title
                            : "No Title"}
                    </h5>

                    <p className="card-text">
                        {description
                            ? description.length > 120
                                ? description.slice(0, 120) + "..."
                                : description
                            : "No description available."}
                    </p>

                    <p className="card-text mt-auto">
                        <small className="text-muted">
                            By {author || "Unknown"} on{" "}
                            {date ? new Date(date).toGMTString() : "Unknown Date"}
                        </small>
                    </p>

                    {/* Button */}
                    <a
                        rel="noreferrer"
                        href={newsUrl}
                        target="_blank"
                        className="btn btn-sm btn-dark mt-2"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
