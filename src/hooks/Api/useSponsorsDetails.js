import { useQuery } from "react-query";
import SponsorsServices from "../../services/SponsorsServices";

const useSponsorDetails = (sponsorsData) => {
  const { data: sponsors, isLoading } = useQuery(
    ['sponsorImages', sponsorsData],
    () => SponsorsServices.getSponsorImages(sponsorsData),
    {
      refetchOnWindowFocus: false,
    }
  );

  const formattedSponsors = sponsors?.map(({ value }) => value);

  return {
    sponsors: formattedSponsors,
    isLoading,
  };
};

export default useSponsorDetails;
