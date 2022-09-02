import React from 'react'; 
import { Routes, Route, BrowserRouter, Link, useParams } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopToolbar from './components/TopToolbar';
import PresentationView from './components/PresentationView';

const App = () =>  {

    return (
        <div className="App">
            <TopToolbar />
                <BrowserRouter>
                <Routes>
                    <Route path="/presentations/" element={<PresentationView /> } />
                    <Route path="/presentations/:name" element={<PresentationView />}/>
                </Routes>
            </BrowserRouter>
        </div>

    )
}
export default App;