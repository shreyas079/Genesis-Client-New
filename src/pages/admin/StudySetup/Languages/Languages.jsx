import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import {
  FaPlusSquare,
  FaMinusSquare,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import { Box } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getStudyLanguages } from "../../../../services/study_languages";
import { selectStudyLanguages } from "../../../../services/study_languages";
import { getSystemLanguages } from "../../../../services/system_language";
import { addLanguages } from "../../../../services/study_languages";

import "./Languages.css";

const Languages = () => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);
  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const [categories, setCategories] = React.useState([
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
  ]);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    setExpanded("panel1");
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(createLanguageSchema),
  });

  const notify = () =>
    toast.success("Languages Added To Study", {
      toastId: "form-creation",
    });

  const warning = () =>
    toast.warn("Please Select Atleast One Language", {
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  const fetchLanguages = async () => {
    try {
      setLoad(true);

      const [systemRes, studyRes] = await Promise.all([
        getSystemLanguages(),
        getStudyLanguages(),
      ]);

      if (systemRes.status && studyRes.status) {
        const systemData = systemRes.data;
        const studyData = studyRes.data;

        const systemTempData = [];
        if (systemData.length) {
          for (let i = 0; i < systemData.length; i++) {
            const {
              id,
              cultureName,
              displayName,
              isActive,
              isRightToLeft,
              name,
              systemCountry,
              systemCountryId,
            } = systemData[i];
            const systemLangObj = {
              category: 1,
              id,
              cultureName,
              displayName,
              isActive,
              isRightToLeft,
              name,
              systemCountry,
              systemCountryId,
            };
            systemTempData.push(systemLangObj);
          }
        }

        const studyTempData = [];
        if (studyData.length) {
          for (let i = 0; i < studyData.length; i++) {
            const {
              category,
              countryLanguages,
              cultureName,
              displayName,
              id,
              isDefault,
              isRightToLeft,
              isSelected,
              name,
              siteLanguages,
              studyFiles,
              translationApproved,
            } = studyData[i];
            if (category === true) {
              const langObj = {
                category: category === false ? 1 : 2,
                countryLanguages,
                cultureName,
                displayName,
                id,
                isDefault,
                isRightToLeft,
                isSelected,
                name,
                siteLanguages,
                studyFiles,
                translationApproved,
              };
              studyTempData.push(langObj);
            }
          }
        }

        const filteredData = [
          ...systemTempData.filter(
            (d) => !studyTempData.some((s) => s.id === d.id)
          ),
          ...studyTempData,
        ];

        setItems(filteredData);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    } finally {
      setLoad(false);
    }
  };

  React.useEffect(() => {
    fetchLanguages();
  }, []);

  const onLanguagesSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);

      if (items.length > 0) {
        const langArray = [];
        const langData = items;
        for (let i = 0; i < langData.length; i++) {
          const {
            id,
            category,
            cultureName,
            displayName,
            isActive,
            isRightToLeft,
            name,
            systemCountry,
            systemCountryId,
          } = langData[i];
          if (category === 2) {
            const langObj = {
              id,
              category: true,
              cultureName,
              displayName,
              isActive,
              isRightToLeft,
              name,
              systemCountry,
              systemCountryId,
            };
            langArray.push(langObj);
          }
        }
        if (langArray.length > 0) {
          const res = await addLanguages(langArray);
          if (res.status) {
            notify();
            setLoad(false);
          }
        } else {
          warning();
          setLoad(false);
        }
      } else {
        warning();
        setLoad(false);
      }
    } catch (err) {
      console.log("Error: ", err.message);
      requestFailed(err.message);
    } finally {
      setLoad(false);
    }
  };

  const handleSelectLang = (itemId) => {
    setShowDialog(true);
    const item = items.find((item) => item.id === itemId);

    if (item.category === 1) {
      const updatedItems = items.map((item) =>
        item.id === itemId ? { ...item, category: 2 } : item
      );
      setItems(updatedItems);
    } else if (item.category === 2) {
      const updatedItems = items.map((item) =>
        item.id === itemId ? { ...item, category: 1 } : item
      );
      setItems(updatedItems);
    }
  };

  const rearangeArr = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);

    return arrCopy;
  };

  const onDragEnd = (result) => {
    setShowDialog(true);
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === "Categories") {
      setCategories(rearangeArr(categories, source.index, destination.index));
    } else if (destination.droppableId !== source.droppableId) {
      setItems((items) =>
        items.map((item) =>
          item.id === parseInt(result.draggableId)
            ? {
                ...item,
                category: parseInt(result.destination.droppableId),
              }
            : item
        )
      );
    } else {
      setItems(rearangeArr(items, source.index, destination.index));
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/");
  };

  const loadContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  };

  const rowSpacing = {
    marginTop: "2%",
  };

  return (
    <>
      {load ? (
        <>
          <div style={loadContainerStyles}>
            <BeatLoader color="#3661eb" />
          </div>
        </>
      ) : (
        <div className="content-body">
          <p className="study-management-link" style={{ fontWeight: "600" }}>
            <Link to="/study-management">Manage Your Study</Link> |{" "}
            <Link to="/study-management/languages">Languages</Link>
          </p>

          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={12}>
              <div className="subjectConfiguration">
                <div className="subjectVariableHead">
                  <h1>Add languages to the study</h1>
                </div>
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading-md">
                  Available Languages
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading-md">
                  Selected Languages
                </p>
              </div>
            </Col>
          </Row>

          <div>
            <DialogBox
              showDialog={showPrompt}
              confirmNavigation={confirmNavigation}
              cancelNavigation={cancelNavigation}
            />
          </div>
          <Box
            onSubmit={handleSubmit(onLanguagesSubmit)}
            component="form"
            sx={{
              height: "auto",
              width: "100%",
              // padding: "4%",
              gap: "10px",
            }}
            noValidate
            autoComplete="off"
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
                <Droppable droppableId="Categories" type="droppableItem">
                  {(provided) => (
                    <div ref={provided.innerRef}>
                      {categories.map((category, index) => (
                        <Col md={6}>
                          <div style={{ width: "80%" }}>
                            <Accordion
                              expanded={expanded === "panel1"}
                              onChange={handleChange("panel1")}
                            >
                              <AccordionSummary
                                key={index}
                                expandIcon={
                                  expanded === "panel1" ? (
                                    <FaMinusSquare
                                      color="red"
                                      fontSize="16px"
                                    />
                                  ) : (
                                    <FaPlusSquare
                                      color="green"
                                      fontSize="16px"
                                    />
                                  )
                                }
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                              >
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    width: "100%",
                                    flexShrink: 0,
                                  }}
                                >
                                  {index === 0
                                    ? "Languages"
                                    : "Selected Languages"}
                                </Typography>
                              </AccordionSummary>

                              <Draggable
                                draggableId={`category-${category.id}`}
                                key={`category-${category.id}`}
                                index={index}
                              >
                                {(parentProvider) => (
                                  <div
                                    ref={parentProvider.innerRef}
                                    {...parentProvider.draggableProps}
                                  >
                                    <Droppable
                                      droppableId={category.id.toString()}
                                    >
                                      {(provided) => (
                                        <div ref={provided.innerRef}>
                                          {items
                                            .filter(
                                              (item) =>
                                                item.category === category.id
                                            )
                                            .map((item, index) => {
                                              return (
                                                <Draggable
                                                  draggableId={item.id.toString()}
                                                  key={item.id}
                                                  index={index}
                                                >
                                                  {(provided) => (
                                                    <AccordionDetails
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                      sx={{
                                                        backgroundColor: "#fff",
                                                        border:
                                                          "1px solid #dcdcdc",
                                                        borderRadius: "5px",
                                                        margin: "10px",
                                                      }}
                                                    >
                                                      {item.category === 1 ? (
                                                        <>
                                                          <div
                                                            style={{
                                                              display: "flex",
                                                              alignItems:
                                                                "center",
                                                              justifyContent:
                                                                "space-between",
                                                            }}
                                                          >
                                                            <Typography
                                                              sx={{
                                                                fontSize:
                                                                  "16px",
                                                              }}
                                                            >
                                                              {item.name}
                                                            </Typography>
                                                            <div
                                                              style={{
                                                                marginTop:
                                                                  "10px",
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                              onClick={() =>
                                                                handleSelectLang(
                                                                  item.id
                                                                )
                                                              }
                                                            >
                                                              <FaArrowAltCircleRight
                                                                color="#3661eb"
                                                                style={{
                                                                  fontSize:
                                                                    "18px",
                                                                }}
                                                              />
                                                            </div>
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            alignItems:
                                                              "center",
                                                            justifyContent:
                                                              "left",
                                                            gap: "40px",
                                                          }}
                                                        >
                                                          <div
                                                            style={{
                                                              marginTop: "10px",
                                                              cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                              handleSelectLang(
                                                                item.id
                                                              )
                                                            }
                                                          >
                                                            <FaArrowAltCircleLeft
                                                              color="#6b6e6e"
                                                              style={{
                                                                fontSize:
                                                                  "18px",
                                                              }}
                                                            />
                                                          </div>
                                                          <Typography
                                                            sx={{
                                                              fontSize: "16px",
                                                            }}
                                                          >
                                                            {item.name}
                                                          </Typography>
                                                        </div>
                                                      )}
                                                    </AccordionDetails>
                                                  )}
                                                </Draggable>
                                              );
                                            })}
                                        </div>
                                      )}
                                    </Droppable>
                                  </div>
                                )}
                              </Draggable>
                            </Accordion>
                          </div>
                        </Col>
                      ))}
                    </div>
                  )}
                </Droppable>
              </Row>
            </DragDropContext>

            <Row style={rowSpacing}>
              <Col md={8}></Col>
              <Col md={2}>
                <div className="study-management-head-end">
                  <button
                    onClick={(e) => {
                      handleCancel(e);
                    }}
                    className="study-management-cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </Col>
              <Col md={2}>
                <div className="study-management-head-end">
                  <button
                    type="submit"
                    className="study-management-create-btn-md"
                  >
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </Box>
        </div>
      )}
    </>
  );
};

export default Languages;
