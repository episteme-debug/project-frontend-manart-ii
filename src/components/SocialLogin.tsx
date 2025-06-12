"use client";
import React from "react";

export default function SocialLogin() {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="relative flex items-center my-4 w-full justify-center ">
        <hr className="flex-1 border-gray-300" />
        <span className="px-2 text-gray-500 ">
          O
        </span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <ul className="flex flex-col space-y-2 w-full ">
        <li>
          <button
            data-test="login-with-google-button"
            className="w-full flex items-center justify-center py-3 px-6 rounded-md border border-gray-300 bg-white text-gray-800 hover:shadow-md text-base font-medium "
          >
            <span className="w-full flex items-center justify-center py-3 px-6
            rounded-md bg-white text-gray-800 hover:opacity-90 text-base font-medium">
              Continuar con Google
            </span>
          </button>
        </li>
        <li>
          <button
            data-test="login-with-apple-button"
            className="w-full flex items-center justify-center py-3 px-6 rounded-md bg-black text-white hover:opacity-90 text-base font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10" viewBox="0 0 14 17"
              fill="currentColor"
            >
              <path d="M11.641 6.391c-.012-1.344 1.096-1.995 1.147-2.029-.625-.913-1.596-1.037-1.939-1.051-.826-.084-1.611.487-2.027.487s-1.086-.474-1.787-.462c-.73.012-1.395.426-1.766 1.08-.758 1.317-.194 3.274.544 4.345.364.517.797 1.097 1.364 1.078.536-.019.737-.347 1.384-.347.647 0 .822.347 1.383.332.564-.016.92-.526 1.273-1.047.403-.592.571-1.164.584-1.193-.012-.006-1.123-.431-1.135-1.335zm-1.322-3.621c.376-.456.632-1.09.563-1.725-.545.022-1.203.369-1.598.825-.35.398-.66 1.044-.578 1.65.614.048 1.239-.312 1.613-.75z" />
            </svg>
            <span className="w-full flex items-center justify-center py-3 px-6 rounded-md bg-black text-white hover:opacity-90 text-base font-medium">
              Continuar con Apple
            </span>
          </button>
        </li>
        <li>
          <button
            data-test="login-with-facebook-button"
            className="w-full flex items-center justify-center py-3 px-6 rounded-md bg-blue-800 text-white hover:bg-blue-700 text-base font-medium"
          >
            <span className="w w-full flex items center justify-center py-3 px-6 rounded-md bg-blue-800 text-white hover:opacity-90 text-base font-medium">
              Continuar con Facebook
            </span>
          </button>
        </li>
      </ul>

    </div>
  )
}