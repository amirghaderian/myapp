export interface Imovie {
  id: number;
  title: string;
  year: number;
}
export interface MovieFilters {
  year?: number;
  title?: string;
  sort?: "year" | "id";
  limit?: number;
}
