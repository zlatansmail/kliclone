import React, { useState } from "react";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./article-page.css";
import MainLayout from "../../MainLayout.jsx";
import SuggestedNews from "../../cards/suggested-news/SuggestedNews.jsx";
import CommentContainer from "../../comment-section/CommentContainer.jsx";
import SocialShareButtons from "../../share-buttons/SocialShareButtons.jsx";
import Editor from "../../editor/Editor.jsx";

import stables from "../../../constants/stables.js";
import images from "../../../constants/images.js";
import { getAllPosts, getSinglePost } from "../../../services/index/posts.js";
import { timeSince } from "../../../utils/timeSince.js";
import parseJsonToHtml from "../../../utils/parseJsonToHtml.js";

const ArticlePage = () => {
  const userState = useSelector((state) => state.user);
  const { slug } = useParams();
  const [body, setBody] = useState(null);

  const {
    data: singleData,
    isLoading: isPostLoading,
    isError: isPostError
  } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["post", { slug }],
    onSuccess: (data) => {
      setBody(parseJsonToHtml(data?.body));
    },
    onError(err) {
      toast.error(err.message);
      console.log(err);
    }
  });

  const {
    data: allPostsData,
    isLoading: isNewsLoading,
    isError: isNewsError
  } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError(err) {
      toast.error(err.message);
      console.log(err);
    }
  });
  // let timeSincePost = timeSince(1);

  const getCurrentURL = () => {
    return window.location.href;
  };

  const captionColor = singleData?.categories[0].color;

  console.log(captionColor);

  const currentUrl = getCurrentURL();

  let timeSincePost = timeSince(singleData?.createdAt);
  return (
    <MainLayout>
      <section className="art-page">
        <div className="art-grid-container">
          <div className="art-grid-wrapper">
            <div className="art-grid-item art-title-wrapper">
              <div className="art-caption" style={{color: captionColor}}>{singleData?.caption}</div>
              <h1 className="art-title">{singleData?.title}</h1>
            </div>
            <div className="art-grid-item art-details">
              <div className="art-author">
                <img
                  className="author-profile-pic"
                  alt=""
                  src={
                    singleData?.user?.avatar
                      ? stables.UPLOAD_FOLDER_BASE_URL +
                        singleData?.user?.avatar
                      : images.sampleProfileImage
                  }
                />
                <div>
                  <p className="author-name">
                    {singleData?.user?.name ? singleData?.user?.name : "Author"}
                  </p>
                  <p className="art-time">{timeSincePost}</p>
                </div>
              </div>
              <div className="art-numbers">
                <div className="art-comments">
                  <div className="art-num">{singleData?.comments?.length}</div>
                  <div>komentara</div>
                </div>
                <div className="art-shares">
                  <div className="art-num">30</div>
                  <div>dijeljenja</div>
                </div>
              </div>
              <div className="art-share">
                <SocialShareButtons
                  url={encodeURI(currentUrl)}
                  title={encodeURIComponent(singleData?.title)}
                />
              </div>
            </div>
            <div className="art-grid-item">
              <div className="art-body">
                <div className="art-image">
                  <img
                    src={
                      singleData?.photo
                        ? stables.UPLOAD_FOLDER_BASE_URL + singleData?.photo
                        : images.samplePostImage
                    }
                    alt={singleData?.title}
                  />
                  <p className="image-label">Image</p>
                </div>
                <div className="article-content">
              <div>
                {!isPostLoading && !isPostError && (
                  <Editor
                    content={singleData?.body}
                    editable={false}
                  />
                )}
              </div>
            </div>
              </div>
              <div className="tags">
                {singleData?.tags?.map((tag) => (
                  <div key={tag} className="tag">
                    {tag}
                  </div>
                ))}
              </div>
              <div className="comments-wrapper">
                {!isPostLoading && !isPostError && (
                  <CommentContainer
                    comments={singleData?.comments}
                    loggedInUserId={userState?.userInfo?._id}
                    postSlug={slug}
                  />
                )}
              </div>
            </div>
            <div className="art-grid-item art-related">
              <div className="featured-news-article-wrapper">
                <div className="related-heading">
                  <div className="related-news">
                    {!isNewsLoading && !isNewsError && (
                      <SuggestedNews
                        header={allPostsData?.data[0]?.categories[0]?.title}
                        postsData={allPostsData.data}
                        comments={allPostsData.data.comments}
                        currentPostSlug={singleData?.slug}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ArticlePage;
