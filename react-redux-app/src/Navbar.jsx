import React from "react";
import Logo from "../src/images/LogoLUB.png";

const UI = () => {
  return (
    <div>
      <nav class="bg-white border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto px-4 py-3">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} class="h-12" alt="LUB Logo" />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default UI;
