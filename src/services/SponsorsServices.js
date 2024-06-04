import CoreAPIService from "./CoreAPIService";
import { API_ENDPOINTS, BASE_API_URL, getQueries } from "../utils/api-integration";

const {
  PRIVATE: { SPONSOR_IMAGE },
} = API_ENDPOINTS;

class SponsorsServicesApi {
  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.GENESIS_CENTRAL_API_URL);
  }

  getSponsorImage = async (imageUrl) => {
    const endpoint = `${SPONSOR_IMAGE}?path=${imageUrl}&${getQueries()}`;
    return this.services.get(endpoint);
  };

  getSponsorImages = async (sponsorsData) => {
    const requests = sponsorsData.map((sponsor) =>
      this.getSponsorImage(sponsor.imageUrl).then((res) => ({
        ...sponsor,
        previewImg: res.data,
      }))
    );
    return Promise.allSettled(requests);
  };
}

export default new SponsorsServicesApi();
