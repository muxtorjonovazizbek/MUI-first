import * as Yup from "yup"

// ============================= Log In =============================

export const signInValidationScheme = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // password: Yup.string().matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[~`! @#$%^&*()_-+={[}]|\:;"'<,>.?/]).{6,}$/,
    //   "Password must be at least 6 characters and contain at least one uppercase and one lowercase"
    // ).required("Password is required")
    password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/])(?=.*[0-9]).{6,}$/,
        "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"    ).required("Password is required")
})



// ============================== Teacher ============================
export const teacherValidatioinScheme = Yup.object().shape({
    course: Yup.string().required("Course is required"),
    name: Yup.string().required("Name is required"),
})