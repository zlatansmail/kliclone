import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import Modal from "react-modal";
import slugify from "slugify";

import "./categories.css";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../../../../services/index/categories.js";
import { useDataTable } from "../../../../../hooks/useDataTable.js";

import DataTable from "../../components/data-table/DataTable.jsx";

Modal.setAppElement("#root");

const Categories = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newCategoryParent, setNewCategoryParent] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("");
  
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const {
    userState,
    currentPage,
    searchKeyword,
    data: categoriesData,
    isLoading: isLoadingCategoriesData,
    isFetching: isFetchingCategoriesData,
    isError,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    deleteDataHandler,
    submitSearchKeywordHandler,
    setCurrentPage
  } = useDataTable({
    dataQueryFn: () => getAllCategories(searchKeyword, currentPage),
    dataQueryKey: "categories",
    deleteDataMessage: "Kategorija uspjesno obrisana",
    mutateDeleteFn: ({ token, slug }) => {
      return deleteCategory({ token, slug });
    }
  });

  const { mutate: mutateCreateCategory, isLoading: isLoadingCreateCategory } =
    useMutation({
      mutationFn: ({ token, title, slug, color, parent }) =>
        createCategory({ token, title, slug, color, parent }),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories"]);
        toast.success("Kategorija je kreirana!");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      }
    });



  const handleCreateCategory = () => {
    mutateCreateCategory({
      token: userState?.userInfo?.token,
      parent: newCategoryParent,
      title: newCategoryTitle,
      slug: slugify(newCategoryTitle),
      color: newCategoryColor
    });
  };


  return (
    <div className="manage-posts-wrapper">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Dodaj kategoriju"
          className="modal"
        >
          <div className="modal-content">
            <div className="modal-heading">
              <h3>Dodaj kategoriju</h3>
              <button onClick={closeModal}>Zatvori</button>
            </div>
            <label htmlFor="cat-title">Naslov kategorije</label>
            <input
              id="cat-title"
              type="text"
              placeholder="Unesite naslov kategorije"
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              value={newCategoryTitle}
            />

            <label htmlFor="cat-main-cat">Odaberite glavnu kategoriju</label>
            <select
              name="main-category"
              id="cat-main-cat"
              type="text"
              placeholder="Unesite naslov kategorije"
              onChange={(e) =>
                setNewCategoryParent(
                  e.target.value === "" ? null : e.target.value
                )
              }
              value={newCategoryParent}
            >
              <option value={null}>Glavna kategorija</option>
              {!isLoadingCategoriesData &&
                categoriesData?.data?.map((category) =>
                  category.parent == null ? (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ) : null
                )}
            </select>
            <label htmlFor="cat-color">Boja podnaslova i kategorije</label>
            <input
              id="cat-color"
              type="text"
              placeholder="Unesite boju"
              onChange={(e) => setNewCategoryColor(e.target.value)}
              value={newCategoryColor}
            />
            <button
              disabled={isLoadingCreateCategory}
              type="submit"
              onClick={handleCreateCategory}
            >
              {isLoadingCreateCategory ? "Ucitava se..." : "Kreiraj kategoriju"}
            </button>
          </div>
        </Modal>
        <button className="add-category-button" onClick={openModal}>Dodaj kategoriju</button>
      <DataTable
        pageTitle={"Upravljanje kategorijama"}
        dataListName={"categories"}
        searchInputPlaceholder={"Pretrazi kategorije..."}
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeyworOnChangedHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={[
          "Naslov",
          "Glavna kategorija",
          "Kreirano",
          "Upravljanje"
        ]}
        isLoading={isLoadingCategoriesData}
        isFetching={isFetchingCategoriesData}
        isError={isError}
        data={categoriesData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={categoriesData?.headers}
        userState={userState}
      >
        {categoriesData?.data?.map((category) => (
          <tr key={category._id}>
            <td className="post-img-title">
              <p>{category.title}</p>
            </td>
            <td>
              {category.parent == null ? (
                <p>Glavna kategorija</p>
              ) : (
                <p>{category.parent.title}</p>
              )}
            </td>
            <td>
              {new Date(category.createdAt).toLocaleString("bs-BA", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
              })}
            </td>
            <td className="buttons-cell">
              <button
                disabled={isLoadingDeleteData}
                onClick={() =>
                  deleteDataHandler({
                    slug: category?._id,
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

export default Categories;
