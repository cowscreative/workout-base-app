import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "/src/data/supabaseClient"; // Import Supabase
import Home from "./Screens/Home";
import Workouts from "./Screens/Workouts";
import Stats from "./Screens/Stats";
import Profile from "./Screens/Profile";
import Settings from "./Screens/Settings";
import Login from "/src/Screens/Login"; // New login screen
import BottomNav from "./UI/BottomNav";
import { IoChevronBackOutline, IoSettingsOutline } from "react-icons/io5";
import "/src/styles/App.css";

function Header({ user }) {
    const location = useLocation();
    const navigate = useNavigate();

    // Define pages where the back button should appear
    const showBackButton = location.pathname !== "/";

    return user ? ( // Only show header if user is logged in
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
    ) : null; // Do not render the header if user is not logged in
}

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (!user) navigate("/login"); // Redirect to login if no user
        };
        checkUser();

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => authListener.subscription.unsubscribe();
    }, []);

    return (
        <>
            <Header user={user} /> {/* Pass user to header */}
            <div className="container">
                <Routes>
                    {user ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/workouts" element={<Workouts />} />
                            <Route path="/stats" element={<Stats />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                        </>
                    ) : (
                        <Route path="*" element={<Login />} /> // Redirect all to login if not authenticated
                    )}
                </Routes>
            </div>
            {user && <BottomNav />} {/* Hide bottom nav if not logged in */}
        </>
    );
}

export default App;
