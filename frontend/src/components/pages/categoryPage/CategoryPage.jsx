import React from "react";

import MainLayout from "../../MainLayout.jsx";
import HeroSection from "../../homepage-sections/hero-section/HeroSection.jsx";
import "./category-page.css";
import { useQuery } from "react-query";
import { getAllPosts } from "../../../services/index/posts.js";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();

  const formatedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  console.log(formatedCategory);

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

  const filterPostsByCategory = (categoryTitle) => {
    return allPostsData?.data?.filter((post) =>
      post.categories.some((category) => category.title === categoryTitle)
    );
  };

  const postsByCategory = filterPostsByCategory(formatedCategory);

  return (
    <MainLayout>
      <div className="homepage">
        <div className="home-body">
          {isError && <div>Something went wrong</div>}
          {!isError && !isLoading && (
            <>
              <HeroSection
                postsData={postsByCategory}
              />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
