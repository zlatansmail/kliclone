import React from "react";
import Header from "./components/header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import "./admin-dashboard.css";
import { getUserProfile } from "../../../services/index/users.js";

const AdminDashboard = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["userProfile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("Nemate pristup ovoj stranici");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Nemate pristup ovoj stranici");
    }
  });

  if (profileIsLoading) {
    return (
      <div>
        <h3>Ucitava se</h3>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
