import React from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import {
  FaPlusSquare,
  FaMinusSquare,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
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
import { addStudyCountryFromSystem } from "../../../../services/study_countries";

import "./Countries.css";

const ManageCountries = ({
  categories,
  setCategories,
  countryItems,
  setCountryItems,
  setValue,
}) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);
  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  React.useEffect(() => {
    setExpanded("panel1");
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(createLanguageSchema),
  });

  const notify = () =>
    toast.success("Country Added To Study", {
      toastId: "form-creation",
    });

  const warning = () =>
    toast.warn("Please Select Atleast One Country", {
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  const onSubmit = async () => {
    try {
      setLoad(true);
      setShowDialog(false);

      if (countryItems) {
        var filterData = countryItems.filter((item) => item.category === 2);

        if (filterData.length > 0) {
          let filterTempArray = [];
          for (let i = 0; i < filterData.length; i++) {
            const {
              id,
              category,
              isoId,
              isActive,
              languages,
              name,
              regionId,
              systemRegion,
              updatedBy,
              createdBy,
              dateCreatedAt,
              dateCreatedUtc,
              dateUpdatedAt,
              dateUpdatedUtc,
              displayName,
            } = filterData[i];
            const countryObj = {
              id,
              category: category === 2 ? true : false,
              isoId,
              isActive,
              systemLanguages: languages,
              name,
              regionId,
              systemRegion,
              updatedBy,
              createdBy,
              dateCreatedAt,
              dateCreatedUtc,
              dateUpdatedAt,
              dateUpdatedUtc,
              displayName,
            };
            filterTempArray.push(countryObj);
          }

          const res = await addStudyCountryFromSystem(filterTempArray);

          if (res.status) {
            setLoad(false);
            notify();
            setValue(1);
          }
        } else {
          setLoad(false);
          warning();
        }
      } else {
        setLoad(false);
        warning();
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
    const item = countryItems.find((item) => item.id === itemId);

    const updatedItems = countryItems.map((item) =>
      item.id === itemId
        ? { ...item, category: item.category === 1 ? 2 : 1 }
        : item
    );

    setCountryItems([...new Set(updatedItems)]);
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
      const updatedItems = countryItems.map((item) =>
        item.id === parseInt(result.draggableId)
          ? {
              ...item,
              category: parseInt(result.destination.droppableId),
            }
          : item
      );

      setCountryItems([...new Set(updatedItems)]);
    } else {
      setCountryItems([
        ...new Set(rearangeArr(countryItems, source.index, destination.index)),
      ]);
    }
  };

  const rearangeArr = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);

    return arrCopy;
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

  const rowStyles = {
    marginTop: "2%",
    marginBottom: "2%",
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
          <div>
            <DialogBox
              showDialog={showPrompt}
              confirmNavigation={confirmNavigation}
              cancelNavigation={cancelNavigation}
            />
          </div>
          <Row style={{ marginTop: "-2%", marginBottom: "2%" }}>
            <Col md={12}>
              <div className="subjectConfiguration">
                <div className="subjectVariableHead">
                  <h1>Add countries to the study</h1>
                </div>
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading-md">
                  Available Countries
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading-md">
                  Selected Countries
                </p>
              </div>
            </Col>
          </Row>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Row style={{ marginBottom: "2%" }}>
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
                                    ? "All Countries"
                                    : "Selected Countries"}
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
                                          {countryItems
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
                                                              {
                                                                item?.displayName
                                                              }
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
                                                            {item?.displayName}
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

              <Row style={rowStyles}>
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
            </DragDropContext>
          </form>
        </div>
      )}
    </>
  );
};

export default ManageCountries;
