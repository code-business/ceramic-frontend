import axios from "axios";
const getCeramicIds = async (nextToken: string = "") => {
  try {
    let url = "https://demo.zero2ai.io/api/v1/_crm/data_models/all?synced=true";

    if (nextToken.length) {
      url = `https://demo.zero2ai.io/api/v1/_crm/data_models/all?synced=true&synced=true&next=${nextToken}`;
    }
    const { data } = await axios.get(url);
    if (!data.data_models.length) {
      return {
        data: [],
      };
    }
    const datas = data.data_models.map(
      (dataModel: any) => dataModel.ceramic_entry_id
    );
    return {
      data: datas,
      nextToken: data.next,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
    };
  }
};

export { getCeramicIds };
