import React from "react";

import MainLayout from "../../MainLayout.jsx";
import HeroSection from "../../homepage-sections/hero-section/HeroSection.jsx";
import "./category-page.css";
import { useQuery } from "react-query";
import {
  getPostsByCategory
} from "../../../services/index/posts.js";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { all } from "axios";

const CategoryPage = () => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const categoryTitle = capitalizeFirstLetter(useParams().categoryTitle);
  console.log(categoryTitle);

  const {
    data: postsData,
    isLoading,
    isError
  } = useQuery({
    queryFn: () => getPostsByCategory(categoryTitle),
    queryKey: ["posts", categoryTitle],
    onError(err) {
      toast.error(err.message);
      console.log(err);
    }
  });

  console.log(postsData);

  return (
    <MainLayout>
      <div className="homepage">
        <div className="home-body">
          {isError && <div>Something went wrong</div>}
          {!isError && !isLoading && (
            <>
              <HeroSection postsData={postsData} />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
