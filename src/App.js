// 1. Import *useState* and *useEffect*
import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css"

function App() {
  let [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('man');
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = React.createRef();

    // Update state with user input
  const updateQuery = () => {
    const inputText = inputRef.current.value
    setQuery(inputText)
  }

  // 3. Create out useEffect function
  useEffect(() => {
    setIsLoading(true);
      try {
          fetch(`https://www.omdbapi.com/?s=${query}&apikey=65525897`)
            .then((response) => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then((data) => setMovies(data.Search));
      } catch (error) {
          console.error(error);
      } finally {
          setIsLoading(false);
      }
  }, [query]);

     if (isLoading) {
      return <div style={{ color: 'black' }}>Loading...</div>;
   }

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Final Project
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input ref={inputRef} id="default-search" className="block w-full p-4 pl-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required></input>
                    <button onClick={updateQuery} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {movies && movies.map((data) => (
          <div className="bg-gray-200 p-4">
          <img className="flex w-full justify-center items-center" width={"200px"} height={"200px"} src={data.Poster}></img>
          <div className="p-3">
              <h2 className="text-xl flex w-full justify-center items-center">{data.Title}</h2>
              <p className="text-gray-600 flex w-full justify-center items-center">{data.Year}</p>
          </div>
        </div>
        ))}
    </div>
    </div>
  );
}

export default App;
