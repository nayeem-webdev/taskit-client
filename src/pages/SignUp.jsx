import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AllContext from "../contexts/AllContext";
import { API } from "../api/API";

const SignUp = () => {
  const { createUser, updateUser, loading, setLoading } =
    useContext(AllContext);
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
    setHasUppercase(/[A-Z]/.test(passValue));
    setHasLowercase(/[a-z]/.test(passValue));
    setHasSymbol(/[!@#$%*]/.test(passValue));
    setIsLong(passValue.length >= 8);
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLong && hasSymbol && hasLowercase && hasUppercase) {
      try {
        const res = await createUser(emailRegister, passwordRegister);
        await updateUser(fullName, photoUrl);

        const user = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: fullName,
          photoURL: photoUrl,
        };

        await API.post("/users", user);
        console.log("User created successfully:", res.user);
        setLoading(false);
        navigate("/");
        toast.success("User registered successfully!");
      } catch (err) {
        setLoading(false);
        console.error("Registration Error:", err.message);
        toast.error("User registration failed!");
      }
    } else {
      setLoading(false);
      toast.error("Password does not meet requirements.");
    }
  };

  return (
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-black/5 rounded-lg p-4 md:p-6 shadow-lg flex flex-col lg:flex-row gap-5 lg:h-[calc(100vh-182px)] items-center">
      <div className="max-w-[350px] p-6 w-full mx-auto bg-black/10 dark:bg-white/20 backdrop-blur-md border border-black/5 dark:border-white/30 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <form onSubmit={handleRegister} className="space-y-2">
          <div>
            <label
              htmlFor="name"
              className="block text-[12px] font-medium text-black/60"
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
          <div>
            <label
              htmlFor="photoUrl"
              className="block text-[12px] font-medium text-black/60"
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
              onFocus={() => setPassFocus(true)}
              onChange={(e) => {
                verifyPass(e);
                setPasswordRegister(e.target.value);
              }}
              required
            />
          </div>
          {passFocus && (
            <p
              className={`text-[12px] ${
                hasUppercase && hasLowercase && hasSymbol && isLong
                  ? "text-green-700/80"
                  : "text-red-700/80"
              }`}
            >
              Use uppercase, lowercase, symbol, and number.
            </p>
          )}
          <button
            type="submit"
            className="mt-2 w-full text-white bg-black/80 bg-blur-md py-2 rounded-md font-medium hover:bg-primary/70 transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link to="/" className="text-primary font-medium border-white">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
