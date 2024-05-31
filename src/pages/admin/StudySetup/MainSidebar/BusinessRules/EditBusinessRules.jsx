import React from "react";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditBusinessRules = () => {
  return (
    <div className="content-body">
      <p className="study-management-link" style={{ fontWeight: "600" }}>
        <Link to="/study-management">Manage Your Study</Link> |{" "}
        <Link to="/study-management/study-settings/business-rules">
          Business Rules
        </Link>{" "}
        |{" "}
        <Link to="/study-management/study-settings/create-business-rules">
          Create Business Rules
        </Link>
      </p>
    </div>
  );
};

export default EditBusinessRules;
