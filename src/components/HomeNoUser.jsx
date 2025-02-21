import AuthPage from "../components/SignIn";

const HomeNoUser = () => {
  return (
    <div className=" bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-black/5 rounded-lg p-4 md:p-6 shadow-lg flex flex-col lg:flex-row gap-5 lg:h-[calc(100vh-182px)] items-center">
      {/* Left Div */}
      <div className=" w-full lg:1/2 pl-0 lg:pl-20 py-28 lg:py-0">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 max-w-md md:max-w-xl text-center lg:text-left lg:mx-0 mx-auto md:leading-20">
          Stay on Top of Your Tasks with Taskit
        </h1>
        <p className="text-lg mb-6 text-black/60 max-w-md text-center lg:text-left lg:mx-0 mx-auto">
          Simplify your day, organize your life, and boost your productivity
          with our easy-to-use to-do list app.
        </p>
        <div className="flex justify-center lg:justify-start gap-4">
          <a
            href="/signup"
            className="text-white bg-black/80 bg-blur-md px-4 py-2 rounded-md font-medium hover:bg-primary/70 transition"
          >
            Open Free Account
          </a>
        </div>
      </div>
      {/* Left Div */}
      <div className=" w-full lg:1/2">
        <AuthPage />
      </div>
    </div>
  );
};

export default HomeNoUser;
