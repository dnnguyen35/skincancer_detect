import type { PredictResponse } from "../../type";
import publicClient from "../client/public.client";

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

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default skincancerDetectApi;
