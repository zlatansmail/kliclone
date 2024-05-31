import React, { useState } from "react";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

import "./article-page.css";
import MainLayout from "../../MainLayout.jsx";
// eslint-disable-next-line
import { getSinglePost } from "../../../services/index/posts.js";
import { useParams } from "react-router-dom";
import stables from "../../../constants/stables.js";
import images from "../../../constants/images.js";
import { useSelector } from "react-redux";

const ArticlePage = () => {
  const userState = useSelector((state) => state.user);
  const { slug } = useParams();
  const [body, setBody] = useState(null);

  const { data } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["post", { slug }],
    onSuccess: (data) => {
      setBody(
        parse(
          generateHTML(data?.body, [Bold, Italic, Document, Paragraph, Text])
        )
      );
    },
    onError(err) {
      toast.error(err.message);
      console.log(err);
    }
  });

  // let timeSincePost = timeSince(1);

  return (
    <MainLayout>
      <section className="art-page">
        <div className="art-grid-container">
          <div className="art-grid-wrapper">
            <div className="art-grid-item art-title-wrapper">
              <div className="art-caption">{data?.caption}</div>
              <h1 className="art-title">{data?.title}</h1>
            </div>
            <div className="art-grid-item art-details">
              <div className="art-author">
                <img
                  className="author-profile-pic"
                  alt=""
                  src={
                    data?.user?.avatar
                      ? stables.UPLOAD_FOLDER_BASE_URL + data?.user?.avatar
                      : images.sampleProfileImage
                  }
                />
                <div>
                  <p className="author-name">
                    {data?.user?.name ? data?.user?.name : "Author"}
                  </p>
                  <p className="art-time">1dan</p>
                </div>
              </div>
              <div className="art-numbers">
                <div className="art-comments">
                  <div className="art-num">{data?.comments?.length}</div>
                  <div>komentara</div>
                </div>
                <div className="art-shares">
                  <div className="art-num">30</div>
                  <div>dijeljenja</div>
                </div>
              </div>
              <div className="art-share">
                <div className="share-icons-grid">
                  <div className="share-grid-social-icon">
                    <img alt="share on facebook" src="/social/fb.svg" />
                  </div>
                  <div className="share-grid-social-icon">
                    <img alt="share on twitter" src="/social/x.svg" />
                  </div>
                  <div className="share-grid-social-icon">
                    <img alt="share with mail" src="/social/mail.svg" />
                  </div>
                  <div className="share-grid-social-icon">
                    <img alt="share on viber" src="/social/vib.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="art-grid-item">
              <div className="art-body">
                <div className="art-image">
                  <img
                    src={
                      data?.photo
                        ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                        : images.samplePostImage
                    }
                    alt={data?.title}
                  />
                  <p className="image-label">Image</p>
                </div>
                <div className="art-text">{body}</div>
                <div className="comments-wrapper">
                </div>
              </div>
            </div>
            <div className="art-grid-item art-related">
              <div className="featured-news-article-wrapper">
                <div className="related-heading">
                  {data?.categories
                    ? data.categories.map((category) => (
                        <Link
                          key={category.name}
                          to={`/?category=${category.name}`}
                        >
                          {category.name}
                        </Link>
                      ))
                    : "Povezane vijesti"}
                </div>
                {/* {!isLoading &&
                  !isError &&
                  
                  postsData.map((post) => (
                    <div className="featured-news-article">
                      <ArticleCard
                        key={post._id}
                        title={post.title}
                        caption={post.caption}
                        createdAt={post.createdAt}
                        sharesNo={post.sharesNo}
                        commentNo={post.commentNo}
                        slug={post.slug}
                      />
                    </div>
                  ))}  */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ArticlePage;
