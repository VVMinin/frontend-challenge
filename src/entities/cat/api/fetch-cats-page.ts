import { http } from "../../../shared/api/http";
import { CatImage } from "../model/types/cat";

interface FetchCatsPageParams {
  page: number;
  limit: number;
}

export const fetchCatsPage = async ({ page, limit }: FetchCatsPageParams): Promise<CatImage[]> => {
  const response = await http.get<CatImage[]>("/images/search", {
    params: {
      limit,
      page,
      order: "DESC",
    },
  });

  return response.data;
};
