import React from "react";
import '../../App.css';
import './article-card.css'
import { categoryColors } from '../../objects/categoryColors.js'

export const ArticleCard = ({ image, alt, tagline, headline, shares, comments, timeAdded, category }) => {
    const style = { color: categoryColors[category] || categoryColors.default };;
    return (
        <div className="article-card">
            <div className="article-card-wrapper">
                <div className="article-card-content">
                    <div className="article-image-wrapper">
                        <img src={image} alt={alt} className="article-image" />
                    </div>
                    <div className="article-details-container">
                        <div className="tagline" style={style} >{tagline.toUpperCase()}</div>
                        <h2 className="article-headline" >{headline}</h2>
                    </div>
                    <div className="article-share-comments-time">
                        <div>{timeAdded}</div>
                        <div className="article-shares-comments">
                            <div className="article-shares"><img src='/shares.svg' alt='shares' /> {shares}</div>
                            <div className="article-comments"><img src='/comments.svg' alt='comments' /> {comments}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ArticleCard.defaultProps = {
    image: 'default-image.jpg',
    alt: 'default image',
    tagline: 'tagline',
    headline: 'Headline',
    category: 'Vijesti',
    shares: 100,
    comments: 100,
    timeAdded: 'Prije 1 sat',
};

export default ArticleCard;