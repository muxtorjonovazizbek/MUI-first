import { createRoot } from 'react-dom/client'
import Root from './router/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";



createRoot(document.getElementById('root')).render(
 <Root/>
)
