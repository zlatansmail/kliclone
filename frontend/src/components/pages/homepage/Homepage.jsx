import React from "react";

import MainLayout from "../../MainLayout.jsx";
import HeroSection from "../../homepage-sections/hero-section/HeroSection.jsx";
import CategorySectionSix from "../../homepage-sections/category-six/CategorySectionSix.jsx";
import CategorySectionFour from "../../homepage-sections/category-four/CategorySectionFour.jsx";
import CategorySectionPromo from "../../homepage-sections/category-promo/CategorySectionPromo.jsx";
import "./homepage.css";
import { useQuery } from "react-query";
import { getAllPosts } from "../../../services/index/posts.js";
import toast from "react-hot-toast";

const Homepage = () => {
  const categorySectionSixCategories = [
    "Vijesti",
    "Biznis",
    "Sport",
    "Magazin",
    "Lifestyle"
  ];

  const categorySectionFourCategories = ["Auto", "Scitech"];

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

  return (
    <MainLayout>
      <div className="homepage">
        <div className="home-body">
          {isError && <div>Something went wrong</div>}
          {!isError && !isLoading && (
            <>
              <HeroSection postsData={allPostsData} />
              {categorySectionSixCategories.map((category) => (
                <CategorySectionSix
                  key={category}
                  sectionHeading={category}
                  categoryColor={
                    filterPostsByCategory(category)[0]?.categories[0]?.color
                  }
                  postsData={filterPostsByCategory(category)}
                />
              ))}
              {categorySectionFourCategories.map((category) => (
                <CategorySectionFour
                  key={category}
                  sectionHeading={category}
                  categoryColor={
                    filterPostsByCategory(category)[0]?.categories[0]?.color
                  }
                  postsData={filterPostsByCategory(category)}
                />
              ))}
              <CategorySectionPromo
                sectionHeading={"Promo"}
                categoryColor={filterPostsByCategory("Promo")?.[0]?.categories[0]?.color}
                postsData={filterPostsByCategory("Promo")}
              />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Homepage;
