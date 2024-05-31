{
  /* <Row>
              <Col md={12}>
                <p className="descriptionLabel" style={labelStyles}>
                  Type
                  <span className="error-highlight">*</span>
                </p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <FormControl sx={{ width: "50%" }} className="countriesSelect">
                  <Select
                    defaultValue={""}
                    inputProps={{ "aria-label": "Without label" }}
                    style={{ height: "40px" }}
                    {...register("emailType", {
                      onChange: (e) => {
                        setValue("emailType", e.target.value, {
                          shouldValidate: true,
                        });
                        setShowDialog(true);
                      },
                    })}
                  >
                    <MenuItem value="">
                      <em>Select Name</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                {errors.emailType && (
                  <>
                    <div style={emailErrorStyles.emailFlexEnd}>
                      <div style={emailErrorStyles.emailError}>
                        <span style={emailErrorStyles.errorText}>
                          {errors.emailType.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <p className="descriptionLabel" style={labelStyles}>
                  Email Subject
                  <span className="error-highlight">*</span>
                </p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <FormControl sx={{ width: "50%" }} className="countriesSelect">
                  <TextField
                    inputProps={{
                      style: textBoxStyles,
                    }}
                    {...register("emailSubject", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                </FormControl>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                {errors.emailSubject && (
                  <>
                    <div style={emailErrorStyles.emailFlexEnd}>
                      <div style={emailErrorStyles.emailError}>
                        <span style={emailErrorStyles.errorText}>
                          {errors.emailSubject.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row> */
}
