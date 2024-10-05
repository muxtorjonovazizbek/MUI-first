import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  
  import App from "../App";
  import { 
    Login, 
    Owner, 
    User, 
    Teacher, 
    Student, 
    Home, 
    Groups, 
    Settings, 
    SignUp, 
    Brands,
    BrandCategory, 
    Ads,
    SubCategory,
    NotFound,
    Product,
  } from "../pages";


const Index = () => {
    const router = createBrowserRouter( 
        createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />

            <Route path="owner" element={<Owner />} >
              <Route index element={<Product />} />
              <Route path="student" element={<Student />} />
              <Route path="sub-category/:id" element={<SubCategory />} />
              <Route path="brands" element={<Brands />} />
              <Route path="brand-category" element={<BrandCategory />} />
              <Route path="ads" element={<Ads />} />
            </Route>


            {/* <Route path="user" element={<User />}> 
             <Route index element={<Home />} />
             <Route path="student" element={<Student />} />
             <Route path="groups" element={<Groups />} />
             <Route path="settings" element={<Settings />} />
             
            </Route> */}
            
            
          </Route>
        )
      );
  return <RouterProvider router={router} />
}

export default Index