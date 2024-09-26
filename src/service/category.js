
import https from "./config";

const category = {
    create: (data) => https.post("/category/create", data),
    get: (params) => https.get("/category/search", {params}),
    update: (data) => https.patch("/category/uptade", data),
    delete: (data) => https.delete(`/category/delete${id}`, data),

}
export default category