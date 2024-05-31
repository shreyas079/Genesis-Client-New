import React from "react";
import "./Study.css";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ImportUser = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="content-body">
      <p className="admin-link" style={{ fontWeight: "600" }}>
      <Link to="/homepage">Home</Link> | <Link to="/import-study">Import</Link>
      </p>
      <p className="sponsor-heading">Import</p>
      <div className="uploadField">
        <Row>
          <Col md={5}>
            <label className="uploadInputLabel">Delimiter</label>
            {/* <input className="nameField" type="text" /> */}
            <FormControl className="nameField">
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col md={7}></Col>
        </Row>
        <Row style={{ marginTop: "2%", paddingLeft: "0.5%" }}>
          <Col md={4}>
            <div className="toggleContainer">
              <p className="generalHead">Template</p>
              <p className="generalHead">Import File</p>
            </div>
          </Col>
          <Col md={8}></Col>
        </Row>
        <Row style={{ marginTop: "2%", paddingLeft: "0.5%" }}>
          <Col md={5}>
            <Row>
              <Col md={11}>
                <div className="toggleContainer">
                  <button className="outlinedButton">Download</button>
                  <button className="outlinedButton">Select file...</button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={7}></Col>
        </Row>
        <Row style={{ marginTop: "3%" }}>
          <Col md={6}></Col>
          <Col md={6}>
            <div className="createSponsor-buttons">
              <button className="sponsorCancelButton">Validate Import</button>
              <button className="sponsorCreateButton">Import</button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ImportUser;
