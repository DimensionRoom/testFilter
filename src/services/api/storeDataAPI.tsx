import axios from "../../configs/Axios/axios.config";

export const APIGetStoreData = async (paramData?:any) => {
    try {
      let result = await axios.get('./MOCK_DATA.json', { params: paramData });
      const response = {
        data: result.data,
        status: result.status,
        message: result.statusText,
      };
      return response;
    } catch (error) {
      console.error('error >>>>', error);
      return error;
    }
  };