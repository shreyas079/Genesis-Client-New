import React from "react";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import Configuration from "./Configuration";
import CountryLanguages from "./CountryLanguages";
import ManageCountries from "./ManageCountries";
import PmsCountries from "./PmsCountries";
import { getAllSystemCountries } from "../../../../services/system_country";
import { getStudyCountries } from "../../../../services/study_countries";
import "../StudySetup.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Countries = () => {
  const [value, setValue] = React.useState(0);
  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [checkedLanguages, setCheckedLanguages] = React.useState([]);
  const [filteredCountries, setFilterCountries] = React.useState([]);

  const [countryWithLanguages, setCountryWithLanguages] = React.useState([]);

  const [categories, setCategories] = React.useState([
    { id: 1, name: "Catergory 1" },
    { id: 2, name: "Category 2" },
  ]);

  const [countryItems, setCountryItems] = React.useState([]);

  const handleobjlang = (item, lang) => {
    const allcountries = countryWithLanguages;

    const findCountry = allcountries.findIndex((cntry) => cntry.id === item.id);

    if (findCountry >= 0) {
      const selectedLanguages = allcountries[findCountry].selectedLanguages;

      const languageIndex = selectedLanguages.findIndex(
        (lng) => lng.id === lang.id
      );

      if (languageIndex >= 0) {
        selectedLanguages.splice(languageIndex, 1); // Remove the language object from the array
      } else {
        selectedLanguages.push(lang); // Add the language object to the array
      }

      setCountryWithLanguages([...allcountries]);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchCountries = async () => {
    try {
      setLoad(true);
      const [systemRes, studyRes] = await Promise.all([
        getAllSystemCountries(),
        getStudyCountries(),
      ]);
      if (systemRes.status && studyRes.status) {
        const systemData = systemRes.data;
        const studyData = studyRes.data;

        const systemTempData = [];
        if (systemData.length > 0) {
          for (let i = 0; i < systemData.length; i++) {
            const {
              id,
              name,
              systemLanguages,
              isoId,
              regionId,
              createdBy,
              dateCreatedAt,
              dateCreatedUtc,
              dateUpdatedAt,
              dateUpdatedUtc,
              isActive,
              systemRegion,
              updatedBy,
            } = systemData[i];
            const newData = {
              id,
              name,
              displayName: name,
              isoId,
              regionId,
              createdBy,
              dateCreatedAt,
              dateCreatedUtc,
              dateUpdatedAt,
              dateUpdatedUtc,
              isActive,
              systemRegion,
              updatedBy,
              category: 1,
              languages: systemLanguages,
            };

            systemTempData.push(newData);
          }
        }

        const studyTempData = [];
        if (studyData.length > 0) {
          for (let i = 0; i < studyData.length; i++) {
            const {
              id,
              name,
              languages,
              isoId,
              regionId,
              createdBy,
              dateCreatedAt,
              dateCreatedUtc,
              dateUpdatedAt,
              dateUpdatedUtc,
              isActive,
              systemRegion,
              updatedBy,
            } = studyData[i];
            const newData = {
              id,
              name,
              displayName: name,
              isoId,
              regionId,
              createdBy,
              dateCreatedAt,
              dateCreatedUtc,
              dateUpdatedAt,
              dateUpdatedUtc,
              isActive,
              systemRegion,
              updatedBy,
              category: 2,
              selectedLanguages: languages,
            };

            studyTempData.push(newData);
          }
        }

        const filteredData = [
          ...systemTempData.filter(
            (d) => !studyTempData.some((s) => s.id === d.id)
          ),
          ...studyTempData,
        ];

        setCountryItems(filteredData);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    } finally {
      setLoad(false);
    }
  };

  React.useEffect(() => {
    fetchCountries();
  }, []);

  React.useEffect(() => {
    if (countryItems.length > 0) {
      const tempFilter = countryItems.filter((item) => item.category === 2);
      setFilterCountries(tempFilter);
    }
  }, [countryItems]);

  const tabStyles = {
    fontSize: "12px",
    fontWeight: "700",
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
            <Link to="/study-management/countries">Country</Link>
          </p>

          <div>
            <DialogBox
              showDialog={showPrompt}
              confirmNavigation={confirmNavigation}
              cancelNavigation={cancelNavigation}
            />
          </div>

          <Box sx={{ marginTop: "2%" }}>
            <Box
              sx={{ width: "100%", borderColor: "divider" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="manageStudyTabsBody"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="manageStudyTabs"
                variant="fullWidth"
              >
                <Tab sx={tabStyles} label="Countries" {...a11yProps(0)} />
                <Tab sx={tabStyles} label="Configuration" {...a11yProps(1)} />
                <Tab sx={tabStyles} label="Languages" {...a11yProps(2)} />
                <Tab sx={tabStyles} label="PMS Countries" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ManageCountries
                countryItems={countryItems}
                setCountryItems={setCountryItems}
                categories={categories}
                setCategories={setCategories}
                setValue={setValue}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Configuration
                countries={filteredCountries}
                setValue={setValue}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <CountryLanguages
                fetchCountries={fetchCountries}
                filteredCountries={filteredCountries}
                value={value}
                handleLangObj={handleobjlang}
                checkedLanguages={checkedLanguages}
                setValue={setValue}
                countryWithLanguages={countryWithLanguages}
                setCountryWithLanguages={setCountryWithLanguages}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <PmsCountries
                filteredCountries={filteredCountries}
                checkedLanguages={checkedLanguages}
              />
            </TabPanel>
          </Box>
        </div>
      )}
    </>
  );
};

export default Countries;
