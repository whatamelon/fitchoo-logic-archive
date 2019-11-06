import ax from "./axios";

export const getCollectionProductsAPI = (categories, params) =>
  ax.get(
    `/fc1/items/height/${params.height}/${categories.firstCategory}/${
      categories.secondCategory
    }`,
    {
      params: {
        limit: params.limit,
        offset: params.offset,
        hr: params.heightRange,
        pr: params.priceRange,
        order: params.sortOrder
      }
    }
  );

export const addToSavedProductsAPI = itemId =>
  ax.post(`/fc1/items/favor/${itemId}`);

export const deleteFromSavedProductsAPI = itemId =>
  ax.delete(`/fc1/items/favor/${itemId}`);

export const getSavedProductsAPI = params =>
  ax.get(`/fc1/items/favor`, {
    params: {
      limit: params.limit,
      offset: params.offset
    }
  });

export const getExhibitionProductsAPI = (code, params) =>
  ax.get(`/fc1/items/event/${code}`, {
    params: {
      limit: params.limit,
      offset: params.offset
    }
  });

  export const getCarouselProductsAPI = (code, params) =>
  ax.get(`/fc1/items/event/${code}`, {
    params: {
      limit: params.limit,
      offset: params.offset
    }
  });

