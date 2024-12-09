import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePageMenu from './HomePageMenu';
import Login from './Login'
import Register from './Register'
import CreateRecipe from './CreateRecipe'
import CreateEvent from "./CreateEvent.jsx";
import JoinEvent from "./JoinEvent.jsx";

export default function HomePage() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePageMenu/>}/> 
            <Route path="/login" element={<Login/>}/> 
            <Route path="/register-user" element={<Register/>}/>
            <Route path="/create-recipe" element={<CreateRecipe/>}/>
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/join-event" element={<JoinEvent />} />
            <Route path='*' element={<h1>ERROR 404 PAGE NOT FOUND.</h1>}/>
        </Routes>
    </BrowserRouter>
    )
}
