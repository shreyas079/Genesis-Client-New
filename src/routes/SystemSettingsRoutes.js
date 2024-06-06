import React from "react";
import { Route } from "react-router-dom";
// System Settings
import SystemSettings from "../pages/admin/SystemSettings/SystemSettings";
import AddCountries from "../pages/admin/SystemSettings/Countries/AddCountries";
import EditCountries from "../pages/admin/SystemSettings/Countries/EditCountries";

import AddLanguages from "../pages/admin/SystemSettings/Languages/AddLanguages";
import EditLanguages from "../pages/admin/SystemSettings/Languages/EditLanguages";

import AddRoles from "../pages/admin/SystemSettings/Roles/AddRoles";
import EditRoles from "../pages/admin/SystemSettings/Roles/EditRoles";

import AddRegions from "../pages/admin/SystemSettings/Regions/AddRegions";
import EditRegions from "../pages/admin/SystemSettings/Regions/EditRegions";

const SystemSettingsRoute = [
  {
    path: "/system-settings",
    element: <Layout children={<SystemSettings />} />,
  },
  {
    path: "/system-settings/countries-add",
    element: <Layout children={<AddCountries />} />,
  },
  {
    path: "/system-settings/countries-edit",
    element: <Layout children={<EditCountries />} />,
  },
  {
    path: "/system-settings/languages-add",
    element: <Layout children={<AddLanguages />} />,
  },
  {
    path: "/system-settings/languages-edit",
    element: <Layout children={<EditLanguages />} />,
  },
  {
    path: "/system-settings/roles-add",
    element: <Layout children={<AddRoles />} />,
  },
  {
    path: "/system-settings/roles-edit",
    element: <Layout children={<EditRoles />} />,
  },
  {
    path: "/system-settings/regions-add",
    element: <Layout children={<AddRegions />} />,
  },
  {
    path: "/system-settings/regions-edit",
    element: <Layout children={<EditRegions />} />,
  },
];

export default SystemSettingsRoute;
