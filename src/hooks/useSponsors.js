// hooks/useSponsors.js
import { useQuery } from "react-query";
import { getAllSponsors, getSponsorImage } from "../services/sponsors";

export const useSponsors = (pageNumber = 1, pageSize = 10) => {
  return useQuery(["sponsors", pageNumber, pageSize], () =>
    getAllSponsors(pageNumber, pageSize)
  );
};

export const useSponsorImage = (imageUrl) => {
  return useQuery(["sponsorImage", imageUrl], () => getSponsorImage(imageUrl), {
    enabled: !!imageUrl,
  });
};
