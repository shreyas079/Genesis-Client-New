// useSystemData.js

import { useQuery } from 'react-query';
import { getAllSystemCountries, getAllRegions, } from '../../services/system_country';
import { getSystemLanguages } from '../../services/system_language';
import { getSystemRoles } from '../../services/system_roles';

export const useSystemData = () => {
  const { data: systemCountries, isLoading: countriesLoading, error: countriesError } = useQuery('systemCountries', getAllSystemCountries);
  const { data: systemLanguages, isLoading: languagesLoading, error: languagesError } = useQuery('systemLanguages', getSystemLanguages);
  const { data: regionsData, isLoading: regionsLoading, error: regionsError } = useQuery('regionsData', getAllRegions);
  const { data: rolesData, isLoading: rolesLoading, error: rolesError } = useQuery('rolesData', getSystemRoles);

  console.log('System Countries:', systemCountries);
  console.log('System Languages:', systemLanguages);
  console.log('Regions Data:', regionsData);
  console.log('Roles Data:', rolesData);

  if (countriesError) {
    console.error('Error fetching system countries:', countriesError);
  }
  if (languagesError) {
    console.error('Error fetching system languages:', languagesError);
  }
  if (regionsError) {
    console.error('Error fetching regions data:', regionsError);
  }
  if (rolesError) {
    console.error('Error fetching roles data:', rolesError);
  }

  const loading = countriesLoading || languagesLoading || regionsLoading || rolesLoading;
  const error = countriesError || languagesError || regionsError || rolesError;

  return {
    systemCountries,
    systemLanguages,
    regionsData,
    rolesData,
    loading,
    error
  };
};
