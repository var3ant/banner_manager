import axios from 'axios'
import {AddCategoryDto} from "./Dto/Category/AddCategoryDto";
import {UpdateCategoryDto} from "./Dto/Category/UpdateCategoryDto";

const CATEGORIES_REST_API_URL = process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/category"

class CategoryService {
    getPreviews() {
        return axios.get(CATEGORIES_REST_API_URL + "/previews");
    }

    searchPreviews(field: string) {
        return axios.get(CATEGORIES_REST_API_URL + "/search", {params: {v: field}});
    }

    add(dto: AddCategoryDto) {
        return axios.post(CATEGORIES_REST_API_URL, dto);
    }

    update(dto: UpdateCategoryDto) {
        return axios.put(CATEGORIES_REST_API_URL, dto);
    }

    get(id: number) {
        return axios.get(CATEGORIES_REST_API_URL + "/" + id);
    }

    delete(id: number) {
        return axios.delete(CATEGORIES_REST_API_URL + "/" + id);

    }
}

export default new CategoryService()