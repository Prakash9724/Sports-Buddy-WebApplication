import React from 'react'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
    {/* Animated SVG Background */}
    <svg
      className="absolute inset-0 z-0"
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ffffff"
        fillOpacity="0.1"
        d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,170.7C672,160,768,128,864,128C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        className="animate-wave"
      ></path>
    </svg>

    <div className="bg-white p-8 rounded-lg shadow-lg w-96 z-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
      </div>
      <div className="mt-2 text-center">
        <span className="text-sm">Don't have an account? </span>
        <a href="#" className="text-sm text-blue-600 hover:underline">Sign up</a>
      </div>
    </div>
  </div>
  )
}

export default Login