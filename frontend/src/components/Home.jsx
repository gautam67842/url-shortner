import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

    const [url, setUrl] = useState("");
    const [customSlug, setCustomSlug] = useState("");
    const [shortId, setShortId] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        const checkLogin = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/user/me",
                    {
                        withCredentials: true
                    }
                );

                if (response.data.loggedIn) {
                    setLoggedIn(true);
                }

            } catch (err) {
                setLoggedIn(false);
            }
        };

        checkLogin();

    }, []);


    const generateShortUrl = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/url",
                {
                    url: url
                },
                {
                    withCredentials: true
                }
            );

            setShortId(response.data.id);

        } catch (err) {

            console.log(err);

            if (err.response?.status === 401) {
                window.location.href =
                    "http://localhost:5000/user/login";
            }
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-xl bg-white rounded-lg shadow-md px-8 py-9">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    URL Shortener
                </h1>


                <form onSubmit={generateShortUrl}>

                    {/* URL input */}
                    <label className="block text-gray-700 font-medium mb-2">
                        Enter your URL
                    </label>

                    <input
                        type="text"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="
                            w-full
                            h-12
                            px-4
                            border
                            border-gray-300
                            rounded-md
                            outline-none
                            focus:border-blue-500
                            focus:ring-1
                            focus:ring-blue-500
                            text-gray-800
                        "
                    />


                    {/* Shorten button */}
                    <button
                        type="submit"
                        className="
                            w-full
                            h-12
                            mt-4
                            bg-blue-500
                            hover:bg-blue-600
                            text-white
                            font-medium
                            rounded-md
                            transition
                        "
                    >
                        Shorten URL
                    </button>


                    {/* Custom URL */}
                    {/* <label className="block text-gray-700 font-medium mt-9 mb-2">
                        Custom URL <span className="text-gray-400">(optional)</span>
                    </label>

                    <input
                        type="text"
                        placeholder="Enter custom slug"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        className="
                            w-full
                            h-12
                            px-4
                            border
                            border-gray-300
                            rounded-md
                            outline-none
                            focus:border-blue-500
                            focus:ring-1
                            focus:ring-blue-500
                            text-gray-800
                        "
                    /> */}

                </form>


                {/* Result */}
                <div className="mt-6">

                    {shortId ? (

                        <div className="bg-gray-50 border border-gray-200 rounded-md p-5">

                            <p className="text-gray-600 text-sm mb-2">
                                Your shortened URL
                            </p>

                            <a
                                href={`http://localhost:5000/url/${shortId}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 hover:underline break-all"
                            >
                                http://localhost:5000/url/{shortId}
                            </a>

                        </div>

                    ) : (

                        <div className="bg-gray-50 border border-gray-200 rounded-md py-8 text-center">

                            {/* Lightning icon */}
                            <div className="flex justify-center mb-4">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-12 h-12 text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 13.5l7.5-10.5v7.5h6.75L10.5 21v-7.5H3.75z"
                                    />
                                </svg>

                            </div>

                            <h2 className="text-xl font-medium text-gray-600">
                                No URLs found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                You haven't created any shortened URLs yet.
                            </p>

                        </div>

                    )}

                </div>


                {/* Login button */}
                {!loggedIn && (
                    <button
                        type="button"
                        onClick={() => {
                            window.location.href =
                                "http://localhost:5000/user/login";
                        }}
                        className="
                            w-full
                            mt-5
                            h-11
                            border
                            border-blue-500
                            text-blue-500
                            hover:bg-blue-50
                            font-medium
                            rounded-md
                            transition
                        "
                    >
                        Login
                    </button>
                )}

            </div>

        </div>
    );
}