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
    deleteDataMessage: "Članak uspjesno obrisan",
    mutateDeleteFn: ({ token, slug }) => {
      return deletePost({ token, slug });
    }
  });

  return (
    <div className="manage-posts-wrapper">
      <DataTable
        pageTitle={"Upravljanje člancima"}
        dataListName={"posts"}
        searchInputPlaceholder={"Pretrazi članke..."}
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
            <td>
              <div className="table-cell-content">
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
              </div>
            </td>
            <td>
              <div className="table-cell-content">
                {post.categories.length > 0
                  ? post.categories
                      .slice(0, 3)
                      .map((item) => item.title)
                      .join(", ")
                  : "Bez kategorije"}
              </div>
            </td>
            <td>
              <div className="table-cell-content">
                {new Date(post.createdAt).toLocaleString("bs-BA", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric"
                })}
              </div>
            </td>
            <td>
              <div className="table-cell-content">
                {post.tags.length > 0
                  ? post.tags.map((tag, index) => (
                      <span key={index}>
                        {tag} {post.tags.length - 1 !== index && ","}
                      </span>
                    ))
                  : "Nema tagova"}
              </div>
            </td>
            <td className="buttons-cell">
              <div className="table-cell-content">
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
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
};

export default ManagePosts;
