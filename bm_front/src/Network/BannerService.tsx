import axios from 'axios'
import {AddBannerDto} from "./Dto/Banner/AddBannerDto";
import {UpdateBannerDto} from "./Dto/Banner/UpdateBannerDto";

const BANNER_REST_API_URL = process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/banner"


class BannerService {
    getPreviews() {
        return axios.get(BANNER_REST_API_URL + "/previews");
    }

    searchPreviews(field: string) {
        return axios.get(BANNER_REST_API_URL + "/search", {params: {v: field}});
    }

    add(dto: AddBannerDto) {
        return axios.post(BANNER_REST_API_URL, dto);
    }

    update(dto: UpdateBannerDto) {
        return axios.put(BANNER_REST_API_URL, dto);
    }

    get(id: number) {
        return axios.get(BANNER_REST_API_URL + "/" + id);
    }

    delete(id: number) {
        return axios.delete(BANNER_REST_API_URL + "/" + id);

    }
}

export default new BannerService()