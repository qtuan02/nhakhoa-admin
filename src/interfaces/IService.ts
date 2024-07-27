import { EditorState, RawDraftContentState } from "draft-js";
import { ICategory } from "./ICategory";

export interface IService {
    id?: string,
    name: string,
    image: string,
    quantity_sold?: number,
    status: number,
    min_price?: number,
    max_price?: number,
    unit?: string,
    price?: number,
    quantity?: number,
    category?: ICategory,
    category_id?: number,
    description?: RawDraftContentState | EditorState | string,
}