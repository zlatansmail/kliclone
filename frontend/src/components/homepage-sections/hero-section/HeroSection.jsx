import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";

import "./hero-section.css";
import ArticleCard from "../../cards/article-card/ArticleCard.jsx";
import { getAllPosts } from "../../../services/index/posts.js";

const HeroSection = () => {
  const {
    data: allPostsData,
    isLoading,
    isError
  } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError(err) {
      toast.error(err.message);
      console.log(err);
    }
  });
  console.log(allPostsData?.data[0].categories[0].color)
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
        <div className="hero-articles-container ">
          {!isLoading &&
            !isError &&
            allPostsData?.data.slice(0, 7).map((post) => (
              <div className="grid-item">
                <ArticleCard
                  key={post._id}
                  slug={post.slug}
                  captionColor={post.categories[0]?.color || "rgb(250, 61, 62)"}
                  title={post.title}
                  caption={post.caption}
                  photo={post.photo}
                  createdAt={post.createdAt}
                  sharesNo={post.sharesNo}
                  commentsNo={post.comments.length}
                />
              </div>
            ))}
        </div>
        <div className="featured-news-wrapper ">
          <div className="featured-news-buttons-wrapper">
            <div className="featured-news-button">Najnovije</div>
            <div className="featured-news-button">Najčitanije</div>
            <div className="featured-news-button">Preporuke</div>
          </div>
          <div className="featured-news-article-wrapper">
            {!isLoading &&
              !isError &&
              allPostsData.data.slice(0, 10).map((post, index) => (
                <div className="featured-news-article">
                  <ArticleCard
                    key={post._id}
                    title={post.title}
                    captionColor={post.categories[0]?.color || "rgb(250, 61, 62)"}
                    caption={post.caption}
                    createdAt={post.createdAt}
                    sharesNo={post.sharesNo}
                    slug={post.slug}
                    post={post}
                    commentsNo={post.comments.length}
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
