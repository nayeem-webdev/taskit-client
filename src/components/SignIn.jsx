import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AllContext from "../contexts/AllContext";

const SignIn = () => {
  const { loading } = useContext(AllContext);
  const navigate = useNavigate();

  // State for form fields and verification

  const [emailRegister, setEmailRegister] = useState("");

  // Handle Google login (dummy function)
  const handleSignIn = () => {
    // Implement Google login functionality here
    toast.info("Google login feature coming soon!");
    navigate("/");
  };
  const handleGoogleLogin = () => {
    // Implement Google login functionality here
    toast.info("Google login feature coming soon!");
  };

  return (
    <div className="w-full max-w-[350px] p-6 mx-auto bg-black/5 dark:bg-white/20 backdrop-blur-md border border-black/5 dark:border-white/20 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>

      {/* Sign-In Form */}
      <form onSubmit={handleSignIn} className="space-y-2">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-[12px] font-medium text-black/60"
          >
            Email Address
          </label>
          <input
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            type="email"
            id="emailRegister"
            name="emailRegister"
            placeholder="Email address"
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-[12px] font-medium text-black/60"
          >
            Password
          </label>
          <input
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            type="password"
            id="passwordRegister"
            name="passwordRegister"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full text-white bg-black/80  bg-blur-md py-2 rounded-md font-medium hover:bg-primary/70 transition"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full text-white bg-black/80  bg-blur-md py-2 rounded-md font-medium hover:bg-primary/70 transition"
      >
        Sign Up with Google
      </button>

      {/* Link to Login Page */}
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-700">
          Already have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
