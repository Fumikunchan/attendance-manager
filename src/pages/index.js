import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const succeedLogIn = () => {
    router.push("/attendance/");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-8 p-24`}
    >
      {false ? (
        <>
          <p>You've already logged in.</p>
          <p>If you find this page doesn't work, please</p>
          <p>
            <a href="/" className="capitalize text-primary-600 underline">
              log in again
            </a>{" "}
            <span>or</span>{" "}
            <a href="/" className="capitalize text-primary-600 underline">
              contact the site owner.
            </a>
          </p>
        </>
      ) : (
        <>
          <div>
            <h1 className="mb-1 text-3xl font-bold capitalize text-secondary-900">
              Welcome to Attendance Manager!
            </h1>
            <p className="text-sm font-medium text-primary-600">
              Let me know who you are.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 lg:flex-row">
            <button
              type="button"
              className=" w-24 rounded-lg border border-primary-600 bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
              onClick={succeedLogIn}
            >
              Log In
            </button>

            <button
              type="button"
              className="w-24 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
              disabled
            >
              Sign Up
            </button>
          </div>
        </>
      )}
    </main>
  );
}
