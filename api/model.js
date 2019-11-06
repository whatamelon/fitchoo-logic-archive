import ax from "./axios";

export const getFollowingModelsAPI = () => ax.get(`/models/20/follow`);

export const followModelAPI = params => ax.post(`fc1/models/follow/${params}`);

export const unfollowModelAPI = params =>
  ax.delete(`/fc1/models/follow/${params}`);

export const getModelsByHeightAPI = (height, params) =>
  ax.get(`/models/21/height/${height}`, {
    params: {
      offset: params.offset,
      limit: params.limit
    }
  });

export const getModelsLowHeightAPI = (params) =>
  ax.get(`/models/21/height`, {
    params: {
      offset: params.offset,
      limit: params.limit,
      hfrom: params.hfrom,
      hto: params.hto,
      orderby: params.orderby
    }
  });

export const getModelsMeanHeightAPI = (params) =>
  ax.get(`/models/21/height`, {
    params: {
      offset: params.offset,
      limit: params.limit,
      hfrom: params.hfrom,
      hto: params.hto,
      orderby: params.orderby
    }
  });

export const getModelsHighHeightAPI = (params) =>
  ax.get(`/models/21/height`, {
    params: {
      offset: params.offset,
      limit: params.limit,
      hfrom: params.hfrom,
      hto: params.hto,
      orderby: params.orderby
    }
  });

export const getModelProductsAPI = (categories, params) =>
  ax.get(
    `/fc1/models/items/${params.modelId}/${categories.firstCategory}/${
      categories.secondCategory
    }`,
    {
      params: {
        offset: params.offset,
        limit: params.limit
      }
    }
  );

export const setModelLikeAPI = (modelId , point) =>
// // var params1 = URLSearchParams();
// params.append('point', 2);
  ax.put(
    `/models/21/like/${modelId}?point=1`
  );

export const getRandomModelAPI = (height) =>
  ax.get(`/models/21/random/${height}`);

export const getStyleModelsAPI = (params) =>
  ax.get(`/models/21/style/${params.modelId}`, {
    params: {
      offset: params.offset,
      limit: params.limit
    }
  });

export const getHeightModelsAPI = (params) =>
  ax.get(`/models/21/height/${params.height}`, {
    params: {
      offset: params.offset,
      limit: params.limit
    }
  });

export const getModelInfoAPI = (modelId) =>
  ax.get(`/models/21/${modelId}`);