
import https from "./config";

const brandCategory = {
    create: (data) => https.post("/brand-category/create", data),
    get: (params) => https.get("/brand-category/search", {params}),
    getBrandCategoryId: (id) => https.get(`/brand-category/brand/${id}`),
    update: (id,data) => https.patch(`/brand-category/update/${id}`, data),
    delete: (id) => https.delete(`/brand-category/delete/${id}`),

}
export default brandCategory