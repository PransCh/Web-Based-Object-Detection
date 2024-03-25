import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 py-4 px-6 flex items-center justify-between">
      <a href="/" className="text-white text-2xl font-bold">My App</a>
      <nav>
        <ul className="flex space-x-4 text-white">
          <li>
            <a href="/" className="hover:text-gray-200">Home</a>
          </li>
          <li>
            <a href="/home" className="hover:text-gray-200">About</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-200">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
