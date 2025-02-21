import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AllContext from "../contexts/AllContext";

const SignIn = () => {
  const { createUser, updateUser, loading } = useContext(AllContext);
  const navigate = useNavigate();

  // State for form fields and verification
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passFocus, setPassFocus] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  // Verify password function
  const verifyPass = (e) => {
    const passValue = e.target.value;
    const hasUppercase = /[A-Z]/.test(passValue);
    const hasLowercase = /[a-z]/.test(passValue);
    const hasSymbol = /[!@#$%*]/.test(passValue);
    const isLong = passValue.length >= 8;

    setHasUppercase(hasUppercase);
    setHasLowercase(hasLowercase);
    setHasSymbol(hasSymbol);
    setIsLong(isLong);
  };

  // Handle registration form submission
  const handleRegister = (e) => {
    e.preventDefault();

    if (isLong && hasSymbol && hasLowercase && hasUppercase) {
      createUser(emailRegister, passwordRegister)
        .then(() => {
          updateUser(fullName, photoUrl).then(() => {
            toast.success("User Register Successful!");
            navigate("/account");
          });
        })
        .catch((err) => {
          console.error(err.message);
          toast.error("User Register Failed!");
        });
    } else {
      toast.error("Please meet all password requirements.");
    }
  };

  // Handle Google login (dummy function)
  const handleGoogleLogin = () => {
    // Implement Google login functionality here
    toast.info("Google login feature coming soon!");
  };

  return (
    <div className="p-6 w-full mx-auto bg-black/10 dark:bg-white/20 backdrop-blur-md border border-black/5 dark:border-white/30 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

      {/* Sign-Up Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Full Name Field (conditionally rendered) */}
        {!fullName && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Photo URL Field (conditionally rendered) */}
        {!photoUrl && (
          <div>
            <label
              htmlFor="photoURL"
              className="block text-sm font-medium text-gray-700"
            >
              Photo URL
            </label>
            <input
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              type="url"
              id="photoUrl"
              name="photoUrl"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              required
            />
          </div>
        )}

        {/* Email Address Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
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

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            type="password"
            id="passwordRegister"
            name="passwordRegister"
            placeholder="Password"
            onFocus={() => setPassFocus(true)}
            onChange={(e) => {
              verifyPass(e);
              setPasswordRegister(e.target.value);
            }}
            required
          />
        </div>

        {/* Password requirements */}
        {passFocus && (
          <ul>
            <li
              className={`text-[12px] ${
                hasUppercase ? "text-green-700/80" : "text-red-700/80"
              }`}
            >
              Must have an uppercase letter.
            </li>
            <li
              className={`text-[12px] ${
                hasLowercase ? "text-green-700/80" : "text-red-700/80"
              }`}
            >
              Must have a lowercase letter.
            </li>
            <li
              className={`text-[12px] ${
                hasSymbol ? "text-green-700/80" : "text-red-700/80"
              }`}
            >
              Must have a symbol ! @ # $ % *.
            </li>
            <li
              className={`text-[12px] ${
                isLong ? "text-green-700/80" : "text-red-700/80"
              }`}
            >
              Must be 8 characters long.
            </li>
          </ul>
        )}

        {/* Sign Up Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-primary text-white bg-pink-300/50 bg-blur-md border border-pink-200/50 py-2 rounded-md font-medium hover:bg-primary/70 transition"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {/* Google Login Button */}
      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Sign Up with Google
        </button>
      </div>

      {/* Link to Login Page */}
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-700">
          Already have an account?{" "}
          <a href="/" className="text-primary font-medium border-white">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
