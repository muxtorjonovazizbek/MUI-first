
import https from "./config";

const category = {
    create: (data) => https.post("/category/create", data),
    get: () => https.get("/category/search"),
    update: (data) => https.patch("/category/uptade", data),
    delete: (data) => https.delete(`/category/delete${id}`, data),

}
export default category