import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { getAllSubjectVars } from "../../../../services/study_settings";

import "../StudySetup.css";

const StudySettings = ({ children }) => {
  const [load, setLoad] = React.useState(false);
  const [currentActive, setCurrentActive] = React.useState("Alert Variable");
  const [studySettingState, setStudySettingState] = React.useState([]);

  const navigate = useNavigate();

  const fetchAllSubjectVars = async () => {
    try {
      setLoad(true);
      const res = await getAllSubjectVars();
      if (res.data) {
        setLoad(false);
        console.log("RESSS .... ", res.data);
        var first = res.data.sort((a, b) => a.name.localeCompare(b.name));
        setCurrentActive(first[0].name);
        setStudySettingState(res.data);
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchAllSubjectVars();
  }, []);

  const handleActiveChange = (e, value) => {
    e.preventDefault();
    setCurrentActive(value);
  };

  const uniqueItems = [
    ...new Map(studySettingState.map((item) => [item.name, item])).values(),
  ]; // Only map over items with unique names

  uniqueItems.sort((a, b) => a.name.localeCompare(b.name)); // Sort by letter names

  React.useEffect(() => {
    const activeSetting = studySettingState.find(
      (setting) => setting.name === currentActive
    );
    // const studySettingVariable = activeSetting?.studySettingVariable;

    // if (studySettingVariable) {
    //   const path =
    //     currentActive === "Alert Variable"
    //       ? "/study-management/study-settings/alert-variable"
    //       : currentActive === "Drug Variable"
    //         ? "/study-management/study-settings/drug-variable"
    //         : currentActive === "eCOA Handheld Variable"
    //           ? "/study-management/study-settings/ecoa-handheld-var"
    //           : currentActive === "eCOA Site Based Variable"
    //             ? "/study-management/study-settings/ecoa-site-var"
    //             : currentActive === "eCOA Variable"
    //               ? "/study-management/study-settings/ecoa-variable"
    //               : currentActive === "Study Variable"
    //                 ? "/study-management/study-settings/ecoa-variable"
    //                 : currentActive === "Subject Variable"
    //                   ? "/study-management/study-settings/ecoa-variable"
    //                   : null;

    //   if (path) {
    //     navigate(path, { state: { studySettingVariable } });
    //   }
    // }

    switch (currentActive) {
      case "Alert Variable":
        navigate("/study-management/study-settings/alert-variable", {
          state: { activeSetting: activeSetting },
        });
        break;
      case "Drug Variable":
        navigate("/study-management/study-settings/drug-variable", {
          state: { activeSetting: activeSetting },
        });
        break;
      case "eCOA Handheld Variable":
        navigate("/study-management/study-settings/ecoa-handheld-var", {
          state: { activeSetting: activeSetting },
        });
        break;
      case "eCOA Site Based Variable":
        navigate("/study-management/study-settings/ecoa-site-var", {
          state: { activeSetting: activeSetting },
        });
        break;
      case "eCOA Variable":
        navigate("/study-management/study-settings/ecoa-variable", {
          state: { activeSetting: activeSetting },
        });
        break;
      case "Study Variable":
        navigate("/study-management/study-settings/study-variable", {
          state: { activeSetting: activeSetting },
        });
        break;
      case "Subject Variable":
        navigate("/study-management/study-settings/subject-variable", {
          state: { activeSetting: activeSetting },
        });
        break;
      default:
        break;
    }
  }, [currentActive]);

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
        <div className="studySettingsBody">
          <div className="studySettingsContent">{children}</div>
          <div className="studySettingsSidebar">
            <div className="studySetupOptions">
              {uniqueItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={(e) => handleActiveChange(e, item.name)}
                  className={
                    currentActive === item.name ? `active` : `inactive`
                  }
                >
                  <Link className="studySettingsSideLink">
                    <h3>{item.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudySettings;

/**
 * /study-management/study-settings
 */
