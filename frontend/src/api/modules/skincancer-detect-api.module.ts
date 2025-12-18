import publicClient from "../client/public.client";
import type { PredictResponse } from "../../type";

const skincancerDetectEndpoitns = {
  detect: "/detect",
};

const skincancerDetectApi = {
  getDetect: async (formData: FormData) => {
    try {
      const response = await publicClient.post<PredictResponse>(
        skincancerDetectEndpoitns.detect,
        formData
      );
      return { response: response.data, error: null };
    } catch (error: any) {
      return { response: null, error: error.response?.data || error };
    }
  },
};

export default skincancerDetectApi;
