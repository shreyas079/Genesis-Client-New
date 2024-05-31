import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  TextField,
  Checkbox,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useCallbackPrompt } from "../../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../../components/DialogBox";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreateBusinessRules = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const createBusinessSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    description: yup.string().required("This field is required"),
  });

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

export default CreateBusinessRules;
