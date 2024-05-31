// src/utils/dataMapper.js

export const mapSponsorData = (data) => {
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    dateCreatedAt: row.dateCreatedAt,
    dateCreatedUtc: row.dateCreatedUtc,
    dateUpdatedAt: row.dateUpdatedAt,
    dateUpdatedUtc: row.dateUpdatedUtc,
    createdBy: row.createdBy,
    updatedBy: row.updatedBy,
    imageUrl: row.imageUrl,
    isActive: row.isActive ? "Active" : "Inactive",
  }));
};

export const mapStudyData = (studyData) => {
  return studyData.map((row) => ({
    id: row.id,
    name: row.name,
    portalUrl: row.portalUrl,
    apiUrl: row.apiUrl,
    questionnaireBuilderUrl: row.questionnaireBuilderUrl,
    sponsorId: row.sponsorId,
    sponsorName: row.sponsor.name,
    studyType: row.studyType.name,
    isActive: row.isActive ? "Active" : "Inactive",
    projectManagers: row.projectManagers.map(pm => pm.emailAddress).join(", "),
  }));
};

export const mapExportData = (studyData) => {
  // Check if studyData is not null and is an array
  if (!Array.isArray(studyData)) {
    console.error("Invalid study data format or empty array.");
    return [];
  }

  // Map over studyData and transform each item
  return studyData.map((row) => {
    // Ensure row is an object
    if (typeof row !== "object" || row === null) {
      console.error("Invalid study data item:", row);
      return null;
    }

    // Map properties of each row to the desired export format
    return {
      Name: row.name || "",
      "Portal URL": row.portalUrl || "",
      "API URL": row.apiUrl || "",
      "Questionnaire URL": row.questionnaireBuilderUrl || "",
      "Sponsor Name": row.sponsorName || "",
      "Study Type": row.studyType || "",
      "Is Active": row.isActive ? "Active" : "Inactive",
      "Project Managers": row.projectManagers || "",
    };
  });
};

export const transformStudyData = (studyData) => {
  // Ensure studyData is an array of objects
  if (!Array.isArray(studyData) || studyData.some(row => typeof row !== "object" || row === null)) {
    console.error("Invalid study data format.");
    return [];
  }

  // Transform each object to an array of its values
  return studyData.map((row) => [
    row.id,
    row.name,
    row.portalUrl,
    row.apiUrl,
    row.questionnaireBuilderUrl,
    row.sponsorId,
    row.sponsorName,
    row.studyType,
    row.isActive ? "Active" : "Inactive",
    row.projectManagers,
  ]);
};
