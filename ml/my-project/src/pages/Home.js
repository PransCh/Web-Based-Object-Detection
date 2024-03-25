import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-center">About Our Object Detection Project</h1>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg">
                        Our mission is to provide an accessible and user-friendly platform for object detection, leveraging the power of machine learning to enhance visual understanding. We aim to make this technology available to a wide range of users, from individuals to businesses, enabling them to gain valuable insights from their images.
                    </p>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                    <ul className="list-disc list-inside">
                        <li className="mb-2">
                            <span className="font-bold">Versatile Image Support:</span> Upload images in various formats (JPEG, PNG, BMP, etc.) for object detection.
                        </li>
                        <li className="mb-2">
                            <span className="font-bold">Accurate Object Detection:</span> Our state-of-the-art YOLO (You Only Look Once) machine learning model accurately detects and identifies multiple objects within the uploaded images.
                        </li>
                        <li className="mb-2">
                            <span className="font-bold">Intuitive Visualization:</span> Detected objects are clearly highlighted with bounding boxes and labels, providing an intuitive visual representation.
                        </li>
                        <li className="mb-2">
                            <span className="font-bold">User-Friendly Interface:</span> Our modern and clean user interface ensures a seamless experience for users of all skill levels.
                        </li>
                    </ul>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                    <p className="text-lg mb-2">
                        Our project is built using cutting-edge technologies to deliver a robust and efficient object detection solution:
                    </p>
                    <ul className="list-disc list-inside">
                        <li className="mb-2">
                            <span className="font-bold">Frontend:</span> React.js, a popular JavaScript library for building user interfaces.
                        </li>
                        <li className="mb-2">
                            <span className="font-bold">Backend:</span> Python and Flask, a lightweight and flexible web framework for Python.
                        </li>
                        <li className="mb-2">
                            <span className="font-bold">Machine Learning Model:</span> YOLO (You Only Look Once), a state-of-the-art object detection algorithm known for its accuracy and speed.
                        </li>
                        <li className="mb-2">
                            <span className="font-bold">Styling:</span> Tailwind CSS, a utility-first CSS framework for rapid UI development.
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Contributors</h2>
                    <p className="text-lg">
                        This project was developed by Chitimella Praneeth as part of a professional endeavor. We are committed to continuously improving and expanding the capabilities of our object detection platform.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;