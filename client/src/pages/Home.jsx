import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar'; 
import Heading from '../components/heading'; 
import '../home.css';

const HomePage = () => {
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    useEffect(() => {
        if (!cookies.token) {
            navigate("/login");
        }
    }, [cookies.token, navigate]);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Sidebar />
            <Heading text="Home"/>
            <div className="home-page">
                <div className="welcome-message">
                    <h2>Hello, welcome back!</h2>
                    <p>We're glad to see you again. Please navigate to your desired page with the hamburger menu.</p>
                </div>
            </div>
        </>
    );
};

export default HomePage;

