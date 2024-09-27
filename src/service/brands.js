
import https from "./config";

const brands = {
    create: (data) => https.post("/brand/create", data),
    get: (params) => https.get("/brand/search", {params}),
    update: (data) => https.patch("/brand/update", data),
    delete: (id) => https.delete(`/brand/delete/${id}`),

}
export default brands