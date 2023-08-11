import { Recipe } from "./recipe";

export interface ApiResponse {
    items: Recipe[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
  }