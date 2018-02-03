import {Category} from "./category.interface";

export interface User {
  $key?: string;
  categories: Category[];
}
