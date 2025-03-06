import { useState, useEffect } from "react";
import { supabase } from "/src/data/supabaseClient";
import { useNavigate } from "react-router-dom";
import "/src/styles/Auth.css"; // Import styles

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [saveLogin, setSaveLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem("savedEmail");
        const savedPassword = localStorage.getItem("savedPassword");
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setSaveLogin(true);
        }
    }, []);

    const handleAuth = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            if (isSignUp) {
                // SIGN UP
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setMessage("Check your email to confirm your account!");
            } else {
                // LOGIN
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;

                if (saveLogin) {
                    localStorage.setItem("savedEmail", email);
                    localStorage.setItem("savedPassword", password);
                } else {
                    localStorage.removeItem("savedEmail");
                    localStorage.removeItem("savedPassword");
                }
                navigate("/");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Enter your email to reset your password.");
            return;
        }
        setError("");
        setMessage("Check your email for reset instructions.");
        await supabase.auth.resetPasswordForEmail(email);
    };

    return (
        <div className="auth-container">
            <h1>{isSignUp ? "Create an Account" : "Welcome Back"}</h1>

            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleAuth}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />

                <div className="login-options">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={saveLogin} 
                            onChange={() => setSaveLogin(!saveLogin)} 
                        />
                        Save Login
                    </label>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
                </button>
            </form>

            <p className="toggle-auth" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
            </p>

            {/* Forgot Password Link Below Signup */}
            {!isSignUp && (
                <p className="forgot-password" onClick={handleForgotPassword}>
                    Forgot password?
                </p>
            )}
        </div>
    );
}

export default Login;
