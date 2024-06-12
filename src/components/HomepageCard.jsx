import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Link } from "react-router-dom";

const size = {
  width: 300,
  height: 220,
};

const HomepageCard = ({
  title,
  number,
  subtitle,
  pieData,
  cardColor,
  link,
  src,
}) => {
  const totalValue = pieData.reduce((total, item) => total + item.value, 0);

  const calculatePercentage = (value) => {
    return Math.round((value / totalValue) * 100);
  };
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <Paper
        elevation={6}
        sx={{
          paddingX: 3,
          paddingY: 2,
          margin: 0,
          backgroundColor: cardColor,
          "&:hover": { backgroundColor: "#f1f1f1" },
        }}
      >
        <Stack spacing={1.5}>
          <Typography variant="h6" fontSize={15} fontWeight={"normal"}>
            {title}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
            className="!pt-0"
          >
            <Typography variant="h3" fontWeight={"bold"} color={"#3E4CF4"}>
              {number}
            </Typography>
            {/* img */}
            <img className="card-img" src={src} alt="Sponsors Image" />
          </Stack>

          <Typography
            variant="h6"
            fontSize={12}
            color={"gray"}
            className="!mb-6 !mt-0"
          >
            {subtitle}
          </Typography>
        </Stack>
      </Paper>
    </Link>
  );
};

export default HomepageCard;
