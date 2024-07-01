import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getGoogleAuthInfo } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";

const RedirectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getGoogleAuthInfo(token, navigate, setIsLoading));
  }, [token]);

  return <div>Redirecting</div>;
};

export default RedirectPage;
