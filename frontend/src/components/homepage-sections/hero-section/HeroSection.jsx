import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";

import "./hero-section.css";
import ArticleCard from "../../cards/article-card/ArticleCard.jsx";
import { getAllPosts } from "../../../services/index/posts.js";

const HeroSection = (post) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError(err) {
      toast.error(err.message);
      console.log(err);
    }
  });

  return (
    <section className="hero-section-container">
      <div className="hero-grid-container">
        <div className="hashtag-slider">
          <div>
            <h2 className="hashtag-heading">KLIX STUDIO</h2>
          </div>
          <ul className="hashtag-list">
            <li className="hashtag-item">#VIJESTI</li>
            <li className="hashtag-item">#SCITECH</li>
            <li className="hashtag-item">#NOVO</li>
            <li className="hashtag-item">#NOVO</li>
          </ul>
        </div>
        <div className="hero-articles-container">
          {!isLoading &&
            !isError &&
            data.slice(0, 7).map((post) => (
              <div className="grid-item">
                <ArticleCard
                  key={post._id}
                  title={post.title}
                  caption={post.caption}
                  photo={post.photo}
                  createdAt={post.createdAt}
                  sharesNo={post.sharesNo}
                  commentNo={post.commentNo}
                  slug={post.slug}
                />
              </div>
            ))}
        </div>
        <div className="featured-news-wrapper">
          <div className="featured-news-buttons-wrapper">
            <div className="featured-news-button">Najnovije</div>
            <div className="featured-news-button">Najčitanije</div>
            <div className="featured-news-button">Preporuke</div>
          </div>
          <div className="featured-news-article-wrapper">
            {!isLoading &&
              !isError &&
              data.slice(0, 10).map((post) => (
                <div className="featured-news-article">
                  <ArticleCard
                    key={post._id}
                    title={post.title}
                    caption={post.caption}
                    createdAt={post.createdAt}
                    sharesNo={post.sharesNo}
                    commentNo={post.commentNo}
                    slug={post.slug}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
