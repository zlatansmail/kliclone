import React from "react";
import { useDataTable } from "../../../../../hooks/useDataTable";
import {
  deleteUser,
  getAllUsers,
  updateProfile
} from "../../../../../services/index/users";
import DataTable from "../../components/data-table/DataTable";
import { stables } from "../../../../../constants";
import images from "../../../../../constants/images";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

const Users = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: usersData,
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
      getAllUsers(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "users",
    deleteDataMessage: "Korisnik uspjesno obrisan",
    mutateDeleteFn: ({ token, slug }) => {
      return deleteUser({ token, slug });
    }
  });

  const { mutate: mutateUpdateUser, isLoading: isLoadingUpdateUser } =
    useMutation({
      mutationFn: ({ isAdmin, userId }) =>
        updateProfile({
          token: userState.userInfo.token,
          userData: { admin: isAdmin },
          userId
        }),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["users"]);
        toast.success("Korisnik uspjesno azuriran");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      }
    });

  const handleAdminCheck = (e, userId) => {
    const initialCheckValue = !e.target.checked;
    if (
      window.confirm(
        "Da li ste sigurni da zelite da promenite status korisnika?"
      )
    ) {
      mutateUpdateUser({ isAdmin: e.target.checked, userId });
    } else {
      e.target.checked = initialCheckValue;
    }
  };

  return (
    <div className="manage-posts-wrapper">
      <DataTable
        pageTitle={"Upravljanje korisnicima"}
        dataListName={"users"}
        searchInputPlaceholder={"Pretrazi korisnike po emailu..."}
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeyworOnChangedHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={[
          "Ime",
          "Email",
          "Kreiran na",
          "Verifikovan",
          "Admin",
          " "
        ]}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        data={usersData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={usersData?.headers}
        userState={userState}
      >
        {usersData?.data?.map((user) => (
          <tr key={user._id}>
            <td>
              <img
                src={
                  user?.photo
                    ? stables.UPLOAD_FOLDER_BASE_URL + user.avatar
                    : images.sampleUserImage
                }
                alt="profile"
                className="post-image"
              />
              {user.name}
            </td>
            <td>{user.email}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>{user.verified ? "Da" : "Ne"}</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={user.admin}
                onChange={(e) => handleAdminCheck(e, user._id)}
                disabled={isLoadingUpdateUser}
                className="admin-checkbox"
              />
            </td>
            <td>
              <button
                disabled={isLoadingDeleteData}
                onClick={() =>
                  deleteDataHandler({
                    slug: user._id,
                    token: userState.userInfo.token
                  })
                }
                className="delete-button"
              >
                Obriši
              </button>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
};

export default Users;
