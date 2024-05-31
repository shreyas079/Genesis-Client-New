import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaClone, FaCheck, FaTimes } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import {
    Box,
    TextField,
    Checkbox,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import { createNewVisit } from "../../../../services/visits";
import {
    createTheme,
    ThemeProvider,
    alpha,
    styled,
} from "@mui/material/styles";
import { DataGridPro, gridClasses, GridToolbar } from "@mui/x-data-grid-pro";
import { Row, Col } from "react-bootstrap";

import "../StudySetup.css";
import "./DrugReturn.css";

const getMuiTheme = createTheme({
    typography: {
        fontSize: 25,
    },
    ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
        color: "#000000 !important",
    },
});

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGridPro)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        "&:hover, &.Mui-hovered": {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            "@media (hover: none)": {
                backgroundColor: "transparent",
            },
        },
        "&.Mui-selected": {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
            "&:hover, &.Mui-hovered": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity
                ),
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity
                    ),
                },
            },
        },
    },
}));

const DepotKit = () => {
    const navigate = useNavigate();

    const [load, setLoad] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(5);

    const [showDialog, setShowDialog] = React.useState(false);
    const [showPrompt, confirmNavigation, cancelNavigation] =
        useCallbackPrompt(showDialog);

    const [attributesData, setAttributeData] = React.useState([
        {
            id: 1,
            name: "Test",
            errorMessage: "Test",
            minimum: 10,
            maximum: 10,
            length: 10,
            dataType: "Text Attribute",
            removeId: 1,
        },
    ]);

    const rows = attributesData.map((row) => ({
        id: row.id,
        name: row.name,
        errorMessage: row.errorMessage,
        minimum: row.minimum,
        maximum: row.maximum,
        length: row.length,
        dataType: row.dataType,
        removeId: row.removeId,
    }));

    const columns = [
        {
            field: "id",
            hide: true,
            headerName: "ID",
            renderHeader: () => <strong>{"ID"}</strong>,
            width: "200",
        },
        {
            field: "name",
            // hide: true,
            headerName: "Name",
            renderHeader: () => <strong>{"Name"}</strong>,
            width: "200",
        },
        {
            field: "errorMessage",
            // hide: true,
            headerName: "Error Message",
            renderHeader: () => <strong>{"Error Message"}</strong>,
            width: "200",
        },
        {
            field: "minimum",
            // hide: true,
            headerName: "Minimum",
            renderHeader: () => <strong>{"Minimum"}</strong>,
            width: "200",
        },
        {
            field: "maximum",
            // hide: true,
            headerName: "maximum",
            renderHeader: () => <strong>{"Maximum"}</strong>,
            width: "200",
        },
        {
            field: "length",
            // hide: true,
            headerName: "Length",
            renderHeader: () => <strong>{"Length"}</strong>,
            width: "200",
        },
        {
            field: "dataType",
            // hide: true,
            headerName: "Data Type",
            renderHeader: () => <strong>{"Data Type"}</strong>,
            width: "200",
        },
        {
            field: "removeId",
            // hide: true,
            headerName: "Remove",
            renderHeader: () => <strong>{"Remove"}</strong>,
            width: "200",
            renderCell: (params) => {
                const id = params.row.id;
                return (
                    <div style={{ textAlign: "center" }}>
                        <button
                            style={{
                                cursor: "pointer",
                                textAlign: "center",
                                background: "none",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "blue",
                                color: "#fff",
                                padding: "5px",
                                width: "100px",
                            }}
                        // onClick={async () => {
                        //   navigate(`/study-management/care-givers/edit-caregiver`, {
                        //     state: {
                        //       id: id,
                        //     },
                        //   });
                        // }}
                        >
                            Remove
                            {/* <FaEdit
                      style={{
                        fontSize: "20px",
                        color: "red !important",
                        // marginLeft: "60px",
                      }}
                    /> */}
                        </button>
                    </div>
                );
            },
        },
    ];

    const notify = () =>
        toast.success("Visit Created Successfully", {
            // theme: "colored",
            toastId: "form-creation",
        });

    const requestFailed = () =>
        toast.error("Something went wrong", {
            // theme: "colored",
            toastId: "requestFailed",
        });

    const createVisitSchema = yup.object().shape({
        name: yup.string().required("This field is required"),
        daysExpected: yup.string().required("This field is required"),
        windowBefore: yup.string().required("This field is required"),
        windowAfter: yup.string().required("This field is required"),
        note: yup.string().required("This field is required"),
        lastUpdate: yup.string().required("This field is required"),
        windowOverride: yup
            .bool()
            .oneOf([true, false], "Window override is required"),
        isScheduled: yup.bool().oneOf([true, false], "Is scheduled is required"),
        interviewMode: yup
            .bool()
            .oneOf([true, false], "Interview mode is required"),
        closeOut: yup.bool().oneOf([true, false], "Closeout mode is required"),
        alwaysAvailable: yup
            .bool()
            .oneOf([true, false], "Always available is required"),
        reasonFlag: yup.string().required("This field is required"),
        visitOrder: yup.string().required("This field is required"),
        visitAnchor: yup.string().required("This field is required"),
        visitsTop: yup.string().required("This field is required"),
        dosageModule: yup
            .bool()
            .oneOf([true, false], "Dosage module mode is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createVisitSchema),
    });

    const onSubmit = async (data) => {
        setShowDialog(false);
        console.log("on submit ... ", data);
        if (data) {
            navigate("/study-management/visits");
        }
        // const res = await createNewVisit(data);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/study-management/visits");
    };

    const textBoxStyles = {
        fontSize: 15,
        width: "400px",
        height: "10px",
    };

    const selectStyles = {
        width: "100%",
        marginTop: 1,
    };

    const selectRoleStyles = {
        width: "30%",
        marginTop: 1,
    }

    const selectStylesCol = {
        width: "100%",
        // marginTop: 3,
    };

    return (
        <>
            {load ? (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "70vh",
                        }}
                    >
                        <BeatLoader color="#3661eb" />
                    </div>
                </>
            ) : (
                <div className="content-body">
                    <p className="study-management-link" style={{ fontWeight: "600" }}>
                        <Link to="/study-management">Manage Your Study</Link> |{" "}
                        <Link to="/study-management/drug-return">Drug Return</Link> |{" "}
                        <Link to="/study-management/drug-return/reconciliation">
                            DepotKitStatusManagement
                        </Link>
                    </p>

                    <div>
                        <DialogBox
                            showDialog={showPrompt}
                            confirmNavigation={confirmNavigation}
                            cancelNavigation={cancelNavigation}
                        />
                    </div>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ height: "auto", width: "100%" }}
                        autoComplete="off"
                    >
                        <div className="createVisitBody">
                            <div className="createVisitHeader">
                                <h1>DepotKitStatusManagement Control Setup</h1>
                            </div>
                            <div className="createVisitHeader">
                                <p>
                                    The statues across the top are the choice to be displayed to the user.The statues on the left side are criteria to pull  drug kits to be edited
                                </p>
                            </div>
                            {/* <div className="drugTypesRoleSelect">
                                <p>This contro is based on role permission</p>
                                <FormControl sx={selectRoleStyles}>
                                    <Select
                                        placeholder="Select Option"
                                        inputProps={{
                                            style: textBoxStyles,
                                            "aria-label": "Without label",
                                        }}
                                        {...register("visitId", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    >
                                        <MenuItem value="">
                                            <em>Select Option</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div> */}
                            <div className="createVisitFormBody">
                                <div className="approveQuarantineRow">
                                    <div className="approveQuarantineItem"></div>
                                    <div className="approveQuarantineItem"></div>
                                    <div className="approveQuarantineItem"></div>
                                    <div className="approveQuarantineItem">
                                    </div>
                                    <div className="approveQuarantineItemWide">
                                        {/* <div className="approveQuarantineItemBodyHeading">
                                            <h4>Destroy At Site</h4>
                                        </div> */}
                                        <div className="approveQuarantineItemBody">
                                            <FormControl sx={selectStyles}>
                                                <Select
                                                    placeholder="Select Option"
                                                    inputProps={{
                                                        style: textBoxStyles,
                                                        "aria-label": "Without label",
                                                    }}
                                                    {...register("visitId", {
                                                        onChange: (e) => {
                                                            setShowDialog(true);
                                                        },
                                                    })}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Option</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <div className="approveQuarantineAddButtonReconciliation">
                                                <button>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="approveQuarantineCol">
                                    {/* <div className="approveQuarantineItem">
                    <div className="approveQuarantineItemBody">
                      <div className="approveQuarantineItemBodyHeading">
                        <h4>In Transit</h4>
                      </div>
                      <div className="approveQuarantineButton">
                        <button>Remove</button>
                      </div>
                    </div>
                  </div> */}
                                    <div className="approveQuarantineItem">
                                        <div className="approveQuarantineItemBody">
                                            <FormControl sx={selectStylesCol}>
                                                <Select
                                                    placeholder="Select Option"
                                                    inputProps={{
                                                        style: textBoxStyles,
                                                        "aria-label": "Without label",
                                                    }}
                                                    {...register("visitId", {
                                                        onChange: (e) => {
                                                            setShowDialog(true);
                                                        },
                                                    })}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Option</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <div className="approveQuarantineAddButton">
                                                <button>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>

                    <div className="approveQuarantineAttributes">
                        <h4>Add Attributes</h4>
                    </div>

                    <Box sx={{ marginTop: "2%" }}>
                        <form
                        // onSubmit={handleSubmit(onSubmit)}
                        >
                            <Row style={{ marginTop: "2%" }}>
                                <Col md={5}>
                                    <label className="uploadInputLabel">
                                        Name{" "}
                                        {/* {errors.name?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )} */}
                                    </label>
                                    <input
                                        className="nameField"
                                        type="text"
                                        name="name"
                                    // {...register("name", {
                                    //   onChange: (e) => {
                                    //     setShowDialog(true);
                                    //   },
                                    // })}
                                    />
                                    {/* <span className="error-text">{errors.name?.message}</span> */}
                                </Col>
                                <Col md={2}></Col>
                                <Col md={5}>
                                    <label className="uploadInputLabel">
                                        Minimum Value{" "}
                                        {/* {errors.isoId?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )} */}
                                    </label>

                                    <input
                                        className="nameField"
                                        type="text"
                                        name="isoId"
                                    // {...register("isoId", {
                                    //   onChange: (e) => {
                                    //     setShowDialog(true);
                                    //   },
                                    // })}
                                    />
                                    {/* <span className="error-text">{errors.isoId?.message}</span> */}
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "2%" }}>
                                <Col md={5}>
                                    <label className="uploadInputLabel">
                                        Error Message{" "}
                                        {/* {errors.name?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )} */}
                                    </label>
                                    <input
                                        className="nameField"
                                        type="text"
                                        name="name"
                                    // {...register("name", {
                                    //   onChange: (e) => {
                                    //     setShowDialog(true);
                                    //   },
                                    // })}
                                    />
                                    {/* <span className="error-text">{errors.name?.message}</span> */}
                                </Col>
                                <Col md={2}></Col>
                                <Col md={5}>
                                    <label className="uploadInputLabel">
                                        Maximum Value{" "}
                                        {/* {errors.isoId?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )} */}
                                    </label>

                                    <input
                                        className="nameField"
                                        type="text"
                                        name="isoId"
                                    // {...register("isoId", {
                                    //   onChange: (e) => {
                                    //     setShowDialog(true);
                                    //   },
                                    // })}
                                    />
                                    {/* <span className="error-text">{errors.isoId?.message}</span> */}
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "2%" }}>
                                <Col md={5}>
                                    <label className="uploadInputLabel">
                                        Data Type{" "}
                                        {/* {errors.regionId?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )} */}
                                    </label>

                                    <FormControl className="nameField">
                                        <Select
                                            name="regionId"
                                            // {...register("regionId")}
                                            inputProps={{ "aria-label": "Without label" }}
                                        // onChange={(e) => {
                                        //   setValue("regionId", e.target.value, {
                                        //     shouldValidate: true,
                                        //   });
                                        //   setShowDialog(true);
                                        // }}
                                        >
                                            <MenuItem value="">
                                                <em>Select Data Type</em>
                                            </MenuItem>
                                            {/* {regionsData.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))} */}
                                        </Select>
                                    </FormControl>

                                    {/* <span className="error-text">{errors.regionId?.message}</span> */}
                                </Col>
                                <Col md={2}></Col>
                                <Col md={5}>
                                    <label className="uploadInputLabel">
                                        Minimum Length{" "}
                                        {/* {errors.isoId?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )} */}
                                    </label>

                                    <input
                                        className="nameField"
                                        type="text"
                                        name="isoId"
                                    // {...register("isoId", {
                                    //   onChange: (e) => {
                                    //     setShowDialog(true);
                                    //   },
                                    // })}
                                    />
                                    {/* <span className="error-text">{errors.isoId?.message}</span> */}
                                </Col>
                            </Row>

                            <Row style={{ marginTop: "2%" }}>
                                <Col md={12}>
                                    <div className="addMore">
                                        <p>+Add more</p>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: "3%" }}>
                                <Col md={6}></Col>
                                <Col md={6}>
                                    <div className="createSponsor-buttons">
                                        {/* <button
                      className="sponsorCancelButton"
                      onClick={(e) => {
                        handleCancel(e);
                      }}
                    >
                      Cancel
                    </button> */}
                                        <Link to="/study-management/drug-return">
                                            <button className="backToDrugButton" type="submit">
                                                Back To Drug Return Control
                                            </button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </Box>
                </div>
            )}
        </>
    );
};

export default DepotKit;
