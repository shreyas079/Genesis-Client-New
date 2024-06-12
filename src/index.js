import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  unstable_HistoryRouter as Router,
} from "react-router-dom";
import history from "./hooks/history";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import { AuthProvider } from "./context/auth/AuthContext";
import { SponsorProvider } from "./context/sponsor/SponsorContext";
import { StudyProvider } from "./context/study/StudyContext";
import { UserProvider } from "./context/user/UserContext";
import { SystemSettingProvider } from "./context/systemSettings/SystemSettings";
import { LicenseInfo } from "@mui/x-license-pro";

LicenseInfo.setLicenseKey(
  "e82cb24297efeaa3f4849e0aa6cac863Tz05MDcwNyxFPTE3NDc0ODY2NzgwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <AuthProvider authConfig={authConfig}>
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
    <SponsorProvider>
      <StudyProvider>
        <UserProvider>
          <SystemSettingProvider>
            {/* <BrowserRouter> */}
            <BrowserRouter>
              <AuthProvider>
                {/* <UserInfo /> */}
                <App />
              </AuthProvider>
            </BrowserRouter>
            {/* </BrowserRouter> */}
          </SystemSettingProvider>
        </UserProvider>
      </StudyProvider>
    </SponsorProvider>

    {/* </React.StrictMode> */}
  </QueryClientProvider>
  // </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
