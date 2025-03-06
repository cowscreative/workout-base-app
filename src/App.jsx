import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./Screens/Home";
import Workouts from "./Screens/Workouts";
import Stats from "./Screens/Stats";
import Profile from "./Screens/Profile";
import Settings from "./Screens/Settings"; // New settings page
import BottomNav from "./UI/BottomNav";
import { IoChevronBackOutline, IoSettingsOutline } from "react-icons/io5";
import "/src/styles/App.css";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    // Define pages where the back button should appear
    const showBackButton = location.pathname !== "/";

    return (
        <header className="app-header">
            {/* Back Button (only if needed) */}
            {showBackButton ? (
                <button className="header-btn back-btn" onClick={() => navigate(-1)}>
                    <IoChevronBackOutline />
                </button>
            ) : (
                <div className="header-placeholder"></div> // Empty space to align the logo
            )}

            {/* App Logo (Clickable to reset to Home) */}
            <h1 className="app-logo" onClick={() => navigate("/")}>Workout</h1>

            {/* Settings Icon */}
            <button className="header-btn settings-btn" onClick={() => navigate("/settings")}>
                <IoSettingsOutline />
            </button>
        </header>
    );
}

function App() {
    return (
        <>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workouts" element={<Workouts />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
            <BottomNav />
        </>
    );
}

export default App;