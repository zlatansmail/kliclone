import React from "react";
import ArticleCard from "../../cards/article-card/ArticleCard";
import NavItem from "../../navigation/navItem/NavItem";
import "./category-section-promo.css";

const CategorySectionPromo = ({ sectionHeading, categoryColor, postsData }) => {
  return (
    <section className="promo-cat-section-container">
      <div className="promo-cat-grid-container">
        <div className="promo-cat-grid-item">
          <NavItem content={sectionHeading} boxColor={categoryColor} />
        </div>
        {postsData?.slice(0, 10).map((post) => (
          <div key={post?._id} className="promo-cat-grid-item">
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

export default CategorySectionPromo;
