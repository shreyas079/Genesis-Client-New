import React, { useContext } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Homepage.css";

import sponsors from "../../../assets/admin/sponsors.png";
import studies from "../../../assets/admin/studies_1.png";
import users from "../../../assets/admin/users_1.png";
import settings from "../../../assets/admin/system_settings.png";
import { FaUsers, FaCog } from "react-icons/fa";
import useSponsorDetails from "../../../hooks/Api/useSponsorsDetails";
import SponsorContext from "../../../context/sponsor/SponsorContext";
import { green } from "@mui/material/colors";
import StudyContext from "../../../context/study/StudyContext";
import UserContext from "../../../context/user/UserContext";
import { Grid } from "@mui/material";
import HomepageCard from "../../../components/HomepageCard";
import { cardColors } from "../../../utils";
import SystemSettingContext from "../../../context/systemSettings/SystemSettings";

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalCount } = useContext(SponsorContext);
  const { totalStudyCount } = useContext(StudyContext);
  const { usersCount } = useContext(UserContext);
  const { totalCountryCount } = useContext(SystemSettingContext);
  const usersValue = usersCount || 7;
  const studyCount = totalStudyCount || 10;
  const value = totalCount || 10;
  const countryCount = totalCountryCount || 18;

  const cardData = [
    {
      title: "Total Sponsors",
      number: value,
      subtitle: "Sponsors",
      pieData: [{ value: value }],
      link: "/all-sponsors",
      src: sponsors
    },
    {
      title: "Total Studies",
      number: studyCount,
      subtitle: "Studies",
      pieData: [{ value: studyCount }],
      link: "/all-studies",
      src: studies

    },
    {
      title: "Total Users",
      number: usersValue,
      subtitle: "Users",
      pieData: [{ value: 3 }],
      link: "/all-users",
      src: users

    },
    {
      title: "Total System Settings",
      number: countryCount,
      subtitle: "System Settings",
      pieData: [
        { value: countryCount },
        { value: 2 },
        { value: 3 },
        { value: 4 },
      ],
      link: "/system-settings",
      src: settings

    },
  ];

  return (
    <>
      <div className="content-body">
        <p className="admin-link" style={{ fontWeight: "600" }}>
          <Link to="/homepage">Home</Link>
        </p>
        <p className="admin-heading">Admin Panel</p>

        <Grid container marginTop={2}>
          {cardData?.map((data, i) => (
            <Grid item md={3} padding={2} key={i}>
              <HomepageCard
                title={data?.title}
                number={data?.number}
                subtitle={data?.subtitle}
                pieData={data?.pieData}
                cardColor={cardColors[i]}
                link={data?.link}
                src={data?.src}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Homepage;
