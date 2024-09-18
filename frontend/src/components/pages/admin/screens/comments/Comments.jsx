import React from "react";
import { Link } from "react-router-dom";

import { useDataTable } from "../../../../../hooks/useDataTable";
import {
  deleteComment,
  getAllComments,
  updateComment
} from "../../../../../services/index/comments";
import DataTable from "../../components/data-table/DataTable";
import { stables } from "../../../../../constants";
import images from "../../../../../constants/images";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

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

  const {
    mutate: mutateUpdateCommentCheck,
    isLoading: isLoadingUpdateCommentCheck
  } = useMutation({
    mutationFn: ({ token, check, commentId }) => {
      return updateComment({ token, check, commentId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("comments");
      toast.success(
        data?.check ? "Komentar je odobren" : "Komentar je odbijen"
      );
    },
    onError: (error) => {
      toast.error("Greska prilikom odobravanja komentara");
      console.log(error);
    }
  });

  return (
    <DataTable
      pageTitle={"Upravljanje komentarima"}
      dataListName={"Comments"}
      searchInputPlaceholder={"Pretraži komentare..."}
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeyworOnChangedHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Autor",
        "Komentar",
        "Kreiran",
        "Na članku",
        "Kreiran",
        "Akcije"
      ]}
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
          <td>
            <div className="table-cell-content">
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
            </div>
          </td>
          <td>
            <div className="table-cell-content">
              {comment?.replyOnUser !== null && (
                <p>
                  Odgovor na
                  <Link
                    to={`/clanak/${comment?.post?.slug}/#comment-${comment?._id}`}
                  >
                    {comment?.replyOnUser?.name}
                  </Link>
                </p>
              )}
              {comment?.desc}
            </div>
          </td>
          <td>
            <div className="table-cell-content">
              {new Date(comment?.createdAt).toLocaleString("bs-BA", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
              })}
            </div>
          </td>
          <td className="">
            <div className="table-cell-content">
              <Link to={`/clanak/${comment?.post?.slug}`}>
                {comment?.post?.title}
              </Link>
            </div>
          </td>
          <td className="buttons-cell">
            <div className="table-cell-content">
              <p>
                {new Date(comment?.createdAt).toLocaleString("bs-BA", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric"
                })}
              </p>
            </div>
          </td>
          <td>
            <div className="table-cell-content">
              <button
                disabled={isLoadingUpdateCommentCheck}
                type="button"
                className="update-comment-check-button"
                onClick={() => {
                  mutateUpdateCommentCheck({
                    token: userState.userInfo.token,
                    check: !comment?.check,
                    commentId: comment?._id
                  });
                }}
              >
                {comment?.check ? "Sakrij" : "Prikaži"}
              </button>
              <button
                disabled={isLoadingDeleteData}
                type="button"
                className="update-comment-delete-button"
                onClick={() => {
                  deleteDataHandler({
                    token: userState.userInfo.token,
                    slug: comment?._id
                  });
                }}
              >
                Obriši
              </button>
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Comments;
