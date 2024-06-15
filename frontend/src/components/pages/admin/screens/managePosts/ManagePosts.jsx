import React from "react";
import { Link } from "react-router-dom";
import { stables } from "../../../../../constants/index.js";
import images from "../../../../../constants/images.js";

import { useDataTable } from "../../../../../hooks/useDataTable.js";
import {
  getAllPosts,
  deletePost
} from "../../../../../services/index/posts.js";
import DataTable from "../../components/data-table/DataTable.jsx";

const ManagePosts = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: allPostsData,
    isLoading,
    isFetching,
    isError,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    deleteDataHandler,
    submitSearchKeywordHandler,
    setCurrentPage
  } = useDataTable({
    dataQueryFn: () => getAllPosts(searchKeyword, currentPage),
    dataQueryKey: "post",
    deleteDataMessage: "Clanak uspjesno obrisan",
    mutateDeleteFn: ({ token, slug }) => {
      return deletePost({ token, slug });
    }
  });

  return (
    <div className="manage-posts-wrapper">
      <DataTable
        pageTitle={"Upravljanje postovima"}
        dataListName={"posts"}
        searchInputPlaceholder={"Pretrazi clanke..."}
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeyworOnChangedHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={[
          "Naslov",
          "Kategorije",
          "Kreirano",
          "Tagovi",
          " "
        ]}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        data={allPostsData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={allPostsData?.headers}
        userState={userState}
      >
        {allPostsData?.data?.map((post) => (
          <tr key={post._id}>
            <td className="post-img-title">
              <img
                src={
                  post.photo
                    ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                    : images.samplePostImage
                }
                alt={post.photoDesc}
                className="post-image"
              />
              <p>{post.title}</p>
            </td>
            <td>
              {post.categories.length > 0
                ? post.categories
                    .slice(0, 3)
                    .map((item) => item.title)
                    .join(", ")
                : "Bez kategorije"}
            </td>
            <td>
              {new Date(post.createdAt).toLocaleString("bs-BA", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
              })}
            </td>
            <td className="tags-cell">
              {post.tags.length > 0
                ? post.tags.map((tag, index) => (
                    <span key={index}>
                      {tag} {post.tags.length - 1 !== index && ","}
                    </span>
                  ))
                : "Nema tagova"}
            </td>
            <td className="buttons-cell">
              <Link
                to={`/dashboard/articles/manage/edit/${post?.slug}`}
                className="edit-button"
              >
                Uredi
              </Link>
              <button
                disabled={isLoadingDeleteData}
                onClick={() =>
                  deleteDataHandler({
                    slug: post.slug,
                    token: userState.userInfo.token
                  })
                }
                className="delete-button"
              >
                Obrisi
              </button>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
};

export default ManagePosts;
