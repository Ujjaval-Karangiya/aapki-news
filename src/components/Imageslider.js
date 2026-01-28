import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Custom Arrows
function CustomPrevArrow({ className, onClick }) {
    return (
        <div className={className} onClick={onClick} style={{ ...arrowStyle, left: "10px" }}>
            <FaArrowLeft size={20} color="white" />
        </div>
    );
}

function CustomNextArrow({ className, onClick }) {
    return (
        <div className={className} onClick={onClick} style={{ ...arrowStyle, right: "10px" }}>
            <FaArrowRight size={20} color="white" />
        </div>
    );
}

const arrowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    background: "rgba(0, 0, 0, 0.5)",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    zIndex: 2,
};

export default function InfiniteImageSlider() {
    const [Articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API}`);
                const data = await response.json();
                const filtered = data.articles.filter(
                    (article) => article.urlToImage && article.title && article.description
                );
                setArticles(filtered.slice(0, 20));
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        fetchImages();
    }, []);

    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <div className="pr-55px pl-55px" style={{ width: "100%", marginTop: "50px" }}>
            <Slider {...settings}>
                {Articles.map((article, index) => (
                    <div key={index} style={{ position: "relative" }}>
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            style={{
                                width: "100%",
                                height: "100vh",
                                objectFit: "cover", // Ensures full coverage
                                borderRadius: "8px",
                            }}
                        />
                            <div style={overlayStyle}>
                                <h2 style={titleStyle}>{article.title}</h2>
                                <p style={descStyle}>{article.description}</p>
                            </div>
                        {/* Text overlay */}
                    </div>
                ))}
            </Slider>
        </div>
    );
}

// Overlay text styling
const overlayStyle = {
    textAlign: "center",
    zIndex: 1,
    marginTop: "-278px",
    position: "relative",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(255, 255, 255, 0.78)",
    color: "black",
    padding: "20px",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
};

const titleStyle = {
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginBottom: "10px",
};

const descStyle = {
    fontSize: "1rem",
    lineHeight: "1.4",
};
