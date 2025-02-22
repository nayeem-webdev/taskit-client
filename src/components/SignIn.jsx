import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AllContext from "../contexts/AllContext";
import { API } from "../api/API";
import { GoogleAuthProvider } from "firebase/auth";

const SignIn = () => {
  const { loading, loginWithPassword, loginWithPopUp, setLoading, setUser } =
    useContext(AllContext);
  const navigate = useNavigate();

  // State for form fields and verification
  const [emailRegister, setEmailRegister] = useState("");

  // Handle password login
  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const emailLogin = form.emailRegister.value; // Correct field name
    const passwordLogin = form.passwordRegister.value; // Correct field name
    loginWithPassword(emailLogin, passwordLogin)
      .then((res) => {
        const usr = res.user;
        setUser(usr);
        toast.success("You are Logged in!");
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        toast.error("User Login Failed!");
      });
  };

  // Handle Google login
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    loginWithPopUp(googleProvider)
      .then((res) => {
        const user = res.user;
        setUser(user);

        // Only save user data to server for Google login
        const newUser = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };

        // Save the user data to the server (only for Google login)
        API.post("/users", newUser)
          .then((res) => {
            if (res.data.insertedId) {
              navigate("/");
              toast.success("User registered successfully!");
            } else {
              navigate("/");
              toast.success("You are Logged in!");
            }
          })
          .catch((err) => {
            console.error("Error Creating Item:", err.message);
            toast.error("Failed to Add User!");
          });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("User Login Failed!");
      });
  };

  return (
    <div className="w-full max-w-[350px] p-6 mx-auto bg-black/5 dark:bg-white/20 backdrop-blur-md border border-black/5 dark:border-white/20 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>

      {/* Sign-In Form */}
      <form onSubmit={handlePasswordLogin} className="space-y-2">
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
            id="emailRegister" // Correct id
            name="emailRegister" // Correct name
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
            id="passwordRegister" // Correct id
            name="passwordRegister" // Correct name
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full text-white bg-black/80 bg-blur-md py-2 rounded-md font-medium hover:bg-primary/70 transition"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full text-white bg-black/80 bg-blur-md py-2 rounded-md font-medium hover:bg-primary/70 transition"
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
