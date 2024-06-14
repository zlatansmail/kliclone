import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineCamera } from "react-icons/hi";

import { getSinglePost, updatePost } from "../../../../../services/index/posts";
import parseJsonToHtml from "../../../../../utils/parseJsonToHtml";
import stables from "../../../../../constants/stables";
import toast from "react-hot-toast";

const EditPost = () => {
  const userState = useSelector((state) => state.user);
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);

  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError
  } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["post", slug]
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
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    }
  });

  useEffect(() => {
    if (!isPostLoading && !isPostError) {
      setInitialPhoto(postData?.photo);
      setBody(parseJsonToHtml(postData?.body));
    }
  }, [postData, isPostLoading, isPostError]);

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

    updatedData.append("document", JSON.stringify({}));

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

  return (
    <div>
      <section>
        <article>
          <h1>Edit Post</h1>
          <div className="edit-article-container">
            <div className="article-title">{postData?.title}</div>
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
            <div className="article-content">Article Content</div>
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
        {console.log(photo, initialPhoto, postData)}
      </section>
    </div>
  );
};

export default EditPost;
