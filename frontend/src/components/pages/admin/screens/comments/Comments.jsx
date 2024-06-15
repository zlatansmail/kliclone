import React from "react";
import { Link } from "react-router-dom";

import { useDataTable } from "../../../../../hooks/useDataTable";
import {
  deleteComment,
  getAllComments
} from "../../../../../services/index/comments";
import DataTable from "../../components/data-table/DataTable";
import { stables } from "../../../../../constants";
import images from "../../../../../constants/images";

const Comments = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: allCommentssData,
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
    dataQueryFn: () =>
      getAllComments(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "comments",
    deleteDataMessage: "Komentar uspjesno obrisan",
    mutateDeleteFn: ({ token, slug }) => {
      return deleteComment({ token, commentId: slug });
    }
  });
  return (
    <DataTable
      pageTitle={"Upravljanje komentarima"}
      dataListName={"Comments"}
      searchInputPlaceholder={"Pretrazi komentare..."}
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeyworOnChangedHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Autor", "Komentar", "Kreiran", "Odgovora na", ""]}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      data={allCommentssData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={allCommentssData?.headers}
    >
      {allCommentssData?.data?.map((comment, index) => (
        <tr key={comment._id}>
          <td className="post-img-title">
            <img
              src={
                comment?.user?.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + comment?.user?.avatar
                  : images.sampleUserImage
              }
              alt={comment?.user?.name}
              className="post-image"
            />
            <p>{comment?.user?.name}</p>
          </td>
          <td>
            {comment?.desc}
          </td>
          <td>
            {new Date(comment?.createdAt).toLocaleString("bs-BA", {
              day: "numeric",
              month: "numeric",
              year: "numeric"
            })}
          </td>
          <td className="tags-cell">
            {comment?.replyOnUser?.name || "Nije odgovor"}
          </td>
          <td className="buttons-cell">
            <Link
              to={`/`}
              className="edit-button"
            >
              Uredi
            </Link>
            <button
              disabled={isLoadingDeleteData}
              onClick={() =>
                deleteDataHandler({
                  slug: comment.slug,
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
  );
};

export default Comments;
