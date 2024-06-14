import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./manage-posts.css";
import {
  deletePost,
  getAllPosts
} from "../../../../../services/index/posts.js";
import stables from "../../../../../constants/stables.js";
import images from "../../../../../constants/images.js";
import Pagination from "../../../../common/pagination/Pagination.jsx";

let isFirstRun = true;

const ManagePosts = () => {
  const userState = useSelector((state) => state.user);

  const queryClient = useQueryClient();

  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allPostsData,
    isLoading,
    isFetching,
    isError,
    refetch
  } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage, 10),
    queryKey: ["posts"],
    refetchOnWindowFocus: false,
    onError(err) {
      toast.error(err.message);
      console.log(err);
    }
  });

  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation(
      ({ token, slug }) =>
        deletePost({
          token,
          slug
        }),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["posts"]);
          toast.success("Clanak je obrisan!");
        },
        onError: (error) => {
          toast.error(error.message);
          console.log(error);
        }
      }
    );

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const deletePostHandler = ({ slug, token }) => {
    mutateDeletePost({ token, slug });
  };

  return (
    <div className="screen-container">
      <div className="heading-wrapper">
        <h1 className="heading">Upravljaj clancima</h1>
        <form onSubmit={submitSearchKeywordHandler}>
          <input
            type="text"
            id="myInput"
            placeholder="Pretrazi po naslovu..."
            onChange={searchKeywordHandler}
            value={searchKeyword}
          />
          <button type="submit" className="search-button">
            Pretrazi
          </button>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Naslov</th>
            <th>Kategorija</th>
            <th>Kreirano</th>
            <th>Tagovi</th>
            <th>Uredi</th>
          </tr>
        </thead>
        <tbody id="myTable">
          {isLoading || isFetching ? (
            <tr>
              <td colSpan="5" className="loading">
                Loading...
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td className="error">Greska pri dohvacanju podataka</td>
            </tr>
          ) : allPostsData?.data?.length === 0 ? (
            <tr>
              <td colSpan={5} className="loading">
                Nema clanaka za prikaz
              </td>
            </tr>
          ) : (
            allPostsData?.data.map((post) => (
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
                    ? post.categories.join(", ")
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
                        <span>
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
                    disabled={isLoadingDeletePost}
                    onClick={() =>
                      deletePostHandler({
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
            ))
          )}
        </tbody>
      </table>
      {!isLoading && (
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          totalPageCount={JSON.parse(
            allPostsData?.headers?.["x-totalpagecount"]
          )}
        />
      )}
    </div>
  );
};

export default ManagePosts;
