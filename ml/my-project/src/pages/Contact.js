import React from 'react';
import resume from '../components/praneeth_chitimella_resume.pdf';

const Contact = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-lg mb-4">
                        We'd love to hear from you! Whether you have questions, feedback, or collaboration opportunities, feel free to reach out to us using the information below.
                    </p>
                    <ul className="list-disc list-inside">
                        <li className="mb-2">
                            <span className="font-bold">Email:</span> chitimellapraneeth@gmail.com
                        </li>
                        <li className="mb-2">
                            <span className="font-bold">LinkedIn:</span>{' '}
                            <a
                                href="https://www.linkedin.com/in/chitimella-praneeth-616611258/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                LinkedIn Profile
                            </a>
                        </li>
                        <li className="mb-2">
                            <span className="font-bold">Resume:</span>{' '}
                            <a
                                href={resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                View Resume
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">About the Developer</h2>
                    <p className="text-lg mb-4">
                        This project was developed by Chitimella Praneeth, a passionate Machine Learning Enthusiast with expertise in M.E.R.N, Deep learning, Data Structures and Algorithms, Machine Learning, DBMS (SQL).
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
                    <p className="text-lg mb-4">
                        Are you interested in contributing to this project or collaborating on future endeavors? Feel free to reach out! We're always eager to connect with like-minded individuals and explore potential partnerships or collaborations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;