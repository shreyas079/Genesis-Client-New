import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const size = {
  width: 300,
  height: 200,
};

const HomepageCard = ({title, number, subtitle, pieData, cardColor}) => {
  
  return (
    <>
      <Paper elevation={6} sx={{ paddingX: 3, paddingY: 0, margin: 0, backgroundColor: cardColor }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Stack minWidth={"50%"} spacing={2}>
            <Typography variant="h6" fontSize={16} fontWeight={"bold"}>
              {title}
            </Typography>
            <Typography variant="h3" fontWeight={"bold"}>
              {number}
            </Typography>
            <Typography variant="h6" fontSize={16} color={"gray"}>
              {subtitle}
            </Typography>
          </Stack>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}`,
                data: pieData,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
                fontSize: pieData?.length == 1 ? 50 : 25,
              },
              marginLeft: 10,

            }}
            {...size}
          />
        </Stack>
      </Paper>
    </>
  );
};

export default HomepageCard;
