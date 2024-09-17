import * as Yup from "yup"

// ============================= Log In =============================

export const signInValidationScheme = Yup.object().shape({
    phone_number: Yup.string().required("Name is required"),
    password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/])(?=.*[0-9]).{6,}$/,
        "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"    ).required("Password is required")
})



// ============================== Teacher ============================
export const teacherValidatioinScheme = Yup.object().shape({
    course: Yup.string().required("Course is required"),
    name: Yup.string().required("Name is required"),
})

// ============================== Sign Up  ===========================

export const signUpValidationScheme = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    phone_number: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/])(?=.*[0-9]).{6,}$/,
        "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"    ).required("Password is required")
})