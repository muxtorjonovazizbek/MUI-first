import { createRoot } from 'react-dom/client'
import Root from './router/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import 'antd/dist/reset.css'
import './index.css'



createRoot(document.getElementById('root')).render(
 <Root/>
)
