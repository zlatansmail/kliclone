import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineCamera } from "react-icons/hi";
import CreatableSelect from "react-select/creatable";

import "./edit-post.css";
import { getSinglePost, updatePost } from "../../../../../services/index/posts";
import stables from "../../../../../constants/stables";
import toast from "react-hot-toast";
import {
  categoryToOption,
  filterCategories
} from "../../../../../utils/multiSelectTagUtils.js";

import Editor from "../../../../editor/Editor";
import MultiSelectDropdown from "../../../../common/select-dropdown/MultiSelectDropdown";
import { getAllCategories } from "../../../../../services/index/categories.js";

const promiseOptions = async (inputValue) => {
  const categoriesData = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);

  const [title, setTitle] = useState(null);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [postSlug, setPostSlug] = useState(slug);
  const [caption, setCaption] = useState("");

  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError
  } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["post", slug],
    onSuccess: (data) => {
      setInitialPhoto(data?.photo);
      setCategories(data.categories.map((item) => item._id));
      setTitle(data.title);
      setTags(data.tags);
    },
    refetchOnWindowFocus: false,
  });

  const {
    mutate: mutateUpdatePostDetails,
    isLoading: isLoadingUpdatePostDetails
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({ updatedData, slug, token });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["post", slug]);
      toast.success("Clanaak je uspesno azuriran");
      navigate(`/dashboard/articles/manage/edit/${data.slug}`, {
        replace: true
      });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + postData?.photo
      );

      updatedData.append("postPicture", picture);
    }

    updatedData.append(
      "document",
      JSON.stringify({ body, categories, title, tags, slug: postSlug, caption })
    );

    mutateUpdatePostDetails({
      updatedData,
      slug,
      token: userState.userInfo.token
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Zelite li da obrisete sliku?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  let isPostDataLoaded = !isPostLoading && !isPostError;

  return (
    <div>
      <section>
        <article>
          <h1>Edit Post</h1>
          <div className="edit-article-container">
            <div className="title-input-wrapper">
              <label htmlFor="title" className="title-label">
                <span className="">Naslov clanka</span>
              </label>
              <input
                id="title"
                className="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div className="caption-input-wrapper">
              <label htmlFor="caption" className="caption-label">
                <span className="">Naslov clanka</span>
              </label>
              <input
                id="caption"
                className="caption-input"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Caption"
              />
            </div>
            <div className="slug-input-wrapper">
              <label htmlFor="slug" className="slug-label">
                <span className="">Slug clanka</span>
              </label>
              <input
                id="slug"
                className="slug-input"
                value={postSlug}
                onChange={(e) =>
                  setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
                }
                placeholder="Slug clanka"
              />
            </div>
            <label>
              <span>Kategorije clanka</span>
            </label>
            {isPostDataLoaded && (
              <MultiSelectDropdown
                loadOptions={promiseOptions}
                onChange={(newValue) =>
                  setCategories(newValue.map((item) => item.value))
                }
                defaultValue={postData?.categories.map(categoryToOption)}
              />
            )}
            <label>
              <span>Tagovi clanka</span>
            </label>
            {isPostDataLoaded && (
              <CreatableSelect
                className="tags-multi-select-dropdown"
                isMulti
                defaultValue={postData?.tags.map((tag) => ({
                  value: tag,
                  label: tag
                }))}
                onChange={(newValue) =>
                  setTags(newValue.map((item) => item.value))
                }
              />
            )}
            <div className="article-image-wrapper">
              <label htmlFor="postPicture" className="post-input-label">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    className="article-image"
                    alt={postData?.title}
                  />
                ) : initialPhoto ? (
                  <img
                    src={stables.UPLOAD_FOLDER_BASE_URL + postData?.photo}
                    alt={postData?.title}
                    className="article-image"
                  />
                ) : (
                  <div className="no-image-icon-wrapper">
                    <HiOutlineCamera className="no-image-icon" />
                  </div>
                )}
              </label>
              <input
                type="file"
                className="photo-input"
                id="postPicture"
                onChange={handleFileChange}
              />
              <button
                className="delete-image-button"
                onClick={handleDeleteImage}
              >
                Obrisite sliku
              </button>
            </div>
            <div className="article-body">
              <div>
                {isPostDataLoaded && (
                  <Editor
                    content={postData?.body}
                    editable={true}
                    onDataChange={(data) => {
                      setBody(data);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="article-tags">Article Tags</div>
            <div className="article-categories">Article Categories</div>
            <div className="article-actions">
              <button
                disabled={isLoadingUpdatePostDetails}
                className="edit-article-button"
                onClick={handleUpdatePost}
              >
                Sacuvaj
              </button>
              <button className="delete-article-button">OBRISI</button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default EditPost;
