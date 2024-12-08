import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePageMenu from './HomePageMenu';
import Login from './Login'
import Register from './Register'

export default function HomePage() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePageMenu/>}/> 
            <Route path="/login" element={<Login/>}/> 
            <Route path="/register-user" element={<Register/>}/>
            <Route path='*' element={<h1>ERROR 404 PAGE NOT FOUND.</h1>}/>
        </Routes>
    </BrowserRouter>
    )
}