"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Use PascalCase for component name (SignUp)
function SignUp() {
  const router = useRouter();

  const [formdata, setFormdata] = useState({
    // Use consistent camelCase
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Use consistent camelCase
  const [error, setError] = useState(null); // Added state for error message

  // 1. FIXED: Correctly update state (removed array brackets)
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // 3. FIXED: Concatenate error messages and throw
        throw new Error(
          errorData.msg || `Sign up failed with status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Sign up successful", result.msg);
      setFormdata({
        username: "",
        email: "",
        password: ""
      });
      // Redirect to the login page on success
      router.push("/auth/login");
    } catch (err) {
      console.error("Sign up fail:", err.message);
      setError(err.message); // 3. FIXED: Set the error state to display to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-2 mt-5 flex flex-col items-center gap-5">
        <div className="p-4">
          <h2 className="text-center text-3xl md:text-4xl text-pink-600 font-bold">
            Sign Up
          </h2>
        </div>
        <form
          onSubmit={handlesubmit}
          className="p-4 bg-amber-100 rounded-md w-full md:w-1/4"
        >
          {/* Display Error Message */}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <div className="flex flex-col gap-2 p-2">
            <label htmlFor="username" className="font-semibold text-purple-500">
              Username
            </label>
            <input
              type="text"
              className="border rounded border-brown-800 indent-4 p-1"
              name="username" // 2. FIXED: Changed from 'userName' to 'username'
              value={formdata.username}
              onChange={handlechange}
              required
            />
            {/* Grouped email input correctly */}
            <label htmlFor="email" className="font-semibold text-purple-500">
              Email
            </label>
            <input
              type="email" // Use type="email"
              className="border rounded border-brown-800 indent-4 p-1"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              required
            />
          </div>

          <div className="flex flex-col gap-2 p-2">
            <label htmlFor="password" className="font-semibold text-purple-500">
              Password
            </label>
            <input
              type="password" // Use type="password" for security
              className="border rounded border-brown-800 indent-4 p-1"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-amber-600 py-2 px-5 text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
