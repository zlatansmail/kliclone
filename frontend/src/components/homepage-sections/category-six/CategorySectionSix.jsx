import React from "react";
import ArticleCard from "../../cards/article-card/ArticleCard";
import NavItem from "../../navigation/navItem/NavItem";
import "./category-section-six.css";

const CategorySectionSix = ({
  sectionHeading,
  categoryColor,
  postsData
}) => {
  

  return (
    <section className="cat-six-section-container">
      <div className="cat-six-grid-container">
        <div className="cat-six-grid-item">
          <NavItem
            content={sectionHeading}
            boxColor={categoryColor}
          />
        </div>
        {postsData?.slice(0, 6).map((post) => (
          <div key={post?._id} className="cat-six-grid-item">
          <ArticleCard
            key={post?._id}
            slug={post?.slug}
            captionColor={post?.categories[0]?.color || "rgb(250, 61, 62)"}
            title={post?.title}
            caption={post?.caption}
            photo={post?.photo}
            createdAt={post?.createdAt}
            sharesNo={post?.sharesNo}
            commentsNo={post?.comments.length}
          />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySectionSix;
