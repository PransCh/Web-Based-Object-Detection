import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to My App</h1>
        <p className="text-lg text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae feugiat turpis. Integer scelerisque aliquet arcu, nec sollicitudin libero fermentum at. In sed lectus eget arcu rutrum venenatis. Suspendisse id nisl justo. Ut consequat vel sem sed ultricies.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Mauris vel eros at nisi imperdiet fermentum. In hac habitasse platea dictumst. Sed ultricies ultrices metus, eu fermentum metus volutpat at. Fusce tristique tellus a turpis convallis ullamcorper. Nullam at nunc justo.
        </p>
        <div className="flex justify-center">
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">Get Started</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
