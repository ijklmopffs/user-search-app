import { useState } from "react";
import "./App.css";
import { Octokit } from "@octokit/core";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";
import search from "../assets/icon-search.svg";
import octocat from "../assets/octocat.svg";
import location from "../assets/icon-location.svg";
import twitter from "../assets/icon-twitter.svg";
import website from "../assets/icon-website.svg";
import company from "../assets/icon-company.svg";
import locationDark from "../assets/icon-location-dark.svg";
import twitterDark from "../assets/icon-twitter-dark.svg";
import websiteDark from "../assets/icon-website-dark.svg";
import companyDark from "../assets/icon-company-dark.svg";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const [result, setResult] = useState(null);

  const handleClick = () => {
    setDarkTheme(!darkTheme);
  };

  const resetForm = () => {
    setSearchBar("");
  };

  const searchUser = async () => {
    const octokit = new Octokit({
      auth: import.meta.env.VITE_GITHUB_auth,
    });
    try {
      const response = await octokit.request("GET /users/{username}", {
        username: searchBar,
      });
      setResult(response.data);
    } catch (error) {
      console.error(error.message);
    }
    resetForm();
  };

  function formatDateToReadable(dateString) {
    const date = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const daySuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    const formattedDate = `${daySuffix(day)} ${monthNames[month]}, ${year}`;

    return formattedDate;
  }
  const formattedDate = formatDateToReadable(result?.created_at);

  return (
    <div
      className={
        darkTheme
          ? "bg-[#141d2f] h-screen flex items-center justify-center"
          : "bg-[#f2f2f2] h-screen flex items-center justify-center"
      }
    >
      <section className="w-[90%] md:max-w-[730px] mx-auto">
        <div className="flex items-center justify-between">
          <h1
            className={
              darkTheme
                ? "font-bold text-2xl text-white"
                : "font-bold text-2xl text-[#222731]"
            }
          >
            devfinder
          </h1>
          <div
            onClick={handleClick}
            className={
              darkTheme
                ? "flex cursor-pointer items-center uppercase font-bold text-white text-xs gap-4"
                : "flex cursor-pointer items-center uppercase font-bold text-[#697c9a] text-xs gap-4"
            }
          >
            {darkTheme ? <p>light</p> : <p>dark</p>}
            {darkTheme ? (
              <img src={sun} alt="" className="w-5" />
            ) : (
              <img src={moon} alt="" className="w-5" />
            )}
          </div>
        </div>

        <section className="my-10 md:my-20">
          <div className="flex items-center">
            <img src={search} alt="" className="relative left-10 w-6" />
            <input
              type="text"
              placeholder="Search Github Username"
              className={
                darkTheme
                  ? "w-full p-4 rounded-xl focus:outline-none pl-12 text-white bg-[#1e2a47] placeholder:text-white"
                  : "w-full p-4 rounded-xl focus:outline-none pl-12"
              }
              value={searchBar}
              onChange={(e) => setSearchBar(e.target.value)}
            />
            <button
              onClick={searchUser}
              className="bg-[#0079ff] text-white p-3 rounded-xl relative right-[5.5rem]"
            >
              Search
            </button>
          </div>

          {result ? (
            <div
              className={
                darkTheme
                  ? "my-20 bg-[#1e2a47] rounded-xl p-8 flex flex-col md:flex-row md:gap-20"
                  : "my-20 bg-white rounded-xl p-8 flex flex-col md:flex-row md:gap-20"
              }
            >
              <div className="rounded-full bg-[#f2f2f2] w-fit h-fit">
                <img
                  src={result.avatar_url}
                  alt=""
                  className="w-28 h-28 rounded-full"
                />
              </div>
              <div className="flex-grow text-start md:w-[480px]">
                <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between mb-5">
                  <div>
                    <h1
                      className={
                        darkTheme
                          ? "font-bold text-white text-2xl mb-2"
                          : "font-bold text-[#2b3442] text-2xl mb-2"
                      }
                    >
                      {result.name ? result.name : result.login}
                    </h1>
                    <p className="font-normal text-[#0079ff]">
                      @{result.login}
                    </p>
                  </div>
                  <p
                    className={
                      darkTheme
                        ? "text-white text-sm"
                        : "text-[#697c9a] text-sm"
                    }
                  >
                    Joined {formattedDate}
                  </p>
                </div>
                <div>
                  <p className={darkTheme ? "text-white" : "text-[#4b6a9b]"}>
                    {result.bio ? result.bio : "This profile has no bio"}
                  </p>
                </div>
                <div
                  className={
                    darkTheme
                      ? "flex items-center justify-between my-5 bg-[#141d2f] rounded-xl p-4"
                      : "flex items-center justify-between my-5 bg-[#f6f8ff] rounded-xl p-4"
                  }
                >
                  <div>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xs"
                          : "text-[#4b6a9b] text-xs"
                      }
                    >
                      Repos
                    </p>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xl font-bold"
                          : "text-[#2b3442] text-xl font-bold"
                      }
                    >
                      {result.public_repos}
                    </p>
                  </div>
                  <div>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xs"
                          : "text-[#4b6a9b] text-xs"
                      }
                    >
                      Followers
                    </p>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xl font-bold"
                          : "text-[#2b3442] text-xl font-bold"
                      }
                    >
                      {result.followers}
                    </p>
                  </div>
                  <div>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xs"
                          : "text-[#4b6a9b] text-xs"
                      }
                    >
                      Following
                    </p>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xl font-bold"
                          : "text-[#2b3442] text-xl font-bold"
                      }
                    >
                      {result.following}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center flex-wrap">
                  <div className="flex items-center gap-4 p-2 w-64">
                    {darkTheme ? (
                      <img src={locationDark} alt="" className="w-3" />
                    ) : (
                      <img src={location} alt="" className="w-3" />
                    )}
                    <p
                      className={
                        darkTheme
                          ? "text-sm text-white"
                          : "text-sm text-[#4b6a9b]"
                      }
                    >
                      {result.location ? result.location : "Not available"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 p-2 w-64">
                    {darkTheme ? (
                      <img src={twitterDark} alt="" className="w-3" />
                    ) : (
                      <img src={twitter} alt="" className="w-3" />
                    )}
                    <p
                      className={
                        darkTheme
                          ? "text-sm text-white"
                          : "text-sm text-[#4b6a9b]"
                      }
                    >
                      {result.twitter_username
                        ? result.twitter_username
                        : "Not available"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 p-2 w-64">
                    {darkTheme ? (
                      <img src={websiteDark} alt="" className="w-3" />
                    ) : (
                      <img src={website} alt="" className="w-3" />
                    )}
                    <p
                      className={
                        darkTheme
                          ? "text-sm text-white"
                          : "text-sm text-[#4b6a9b]"
                      }
                    >
                      {result.html_url}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 p-2 w-64">
                    {darkTheme ? (
                      <img src={companyDark} alt="" className="w-3" />
                    ) : (
                      <img src={company} alt="" className="w-3" />
                    )}
                    <p
                      className={
                        darkTheme
                          ? "text-sm text-white"
                          : "text-sm text-[#4b6a9b]"
                      }
                    >
                      {result.company ? result.company : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={
                darkTheme
                  ? "my-20 bg-[#1e2a47] rounded-xl p-8 flex flex-col md:flex-row md:gap-20"
                  : "my-20 bg-white rounded-xl p-8 flex flex-col md:flex-row md:gap-20"
              }
            >
              <div className="rounded-full bg-[#f2f2f2] w-fit h-fit">
                <img src={octocat} alt="" className="w-28 h-28 rounded-full" />
              </div>
              <div className="flex-grow text-start md:w-[480px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
                  <div>
                    <h1
                      className={
                        darkTheme
                          ? "font-bold text-white text-2xl mb-2"
                          : "font-bold text-[#2b3442] text-2xl mb-2"
                      }
                    >
                      The Octocat
                    </h1>
                    <p className="font-normal text-[#0079ff]">@octocat</p>
                  </div>
                  <p
                    className={
                      darkTheme
                        ? "text-white text-sm"
                        : "text-[#697c9a] text-sm"
                    }
                  >
                    Joined 25 Jan 2011
                  </p>
                </div>
                <div>
                  <p className={darkTheme ? "text-white" : "text-[#4b6a9b]"}>
                    This profile has no bio
                  </p>
                </div>
                <div
                  className={
                    darkTheme
                      ? "flex items-center justify-between my-5 bg-[#141d2f] rounded-xl p-4"
                      : "flex items-center justify-between my-5 bg-[#f6f8ff] rounded-xl p-4"
                  }
                >
                  <div>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xs"
                          : "text-[#4b6a9b] text-xs"
                      }
                    >
                      Repos
                    </p>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xl font-bold"
                          : "text-[#2b3442] text-xl font-bold"
                      }
                    >
                      8
                    </p>
                  </div>
                  <div>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xs"
                          : "text-[#4b6a9b] text-xs"
                      }
                    >
                      Followers
                    </p>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xl font-bold"
                          : "text-[#2b3442] text-xl font-bold"
                      }
                    >
                      3938
                    </p>
                  </div>
                  <div>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xs"
                          : "text-[#4b6a9b] text-xs"
                      }
                    >
                      Following
                    </p>
                    <p
                      className={
                        darkTheme
                          ? "text-white text-xl font-bold"
                          : "text-[#2b3442] text-xl font-bold"
                      }
                    >
                      9
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center flex-wrap">
                  <div className="flex items-center gap-4 p-2 w-64">
                    {darkTheme ? (
                      <img src={locationDark} alt="" className="w-3" />
                    ) : (
                      <img src={location} alt="" className="w-3" />
                    )}
                    <p
                      className={
                        darkTheme
                          ? "text-sm text-white"
                          : "text-sm text-[#4b6a9b]"
                      }
                    >
                      San Francisco
                    </p>
                  </div>
                  <div className="flex items-center gap-4 p-2 w-64">
                    {darkTheme ? (
                      <img src={twitterDark} alt="" className="w-3" />
                    ) : (
                      <img src={twitter} alt="" className="w-3" />
                    )}
                    <p
                      className={
                        darkTheme
                          ? "text-sm text-white"
                          : "text-sm text-[#4b6a9b]"
                      }
                    >
                      Not available
                    </p>
                  </div>
                  <div className="flex items-center gap-4 p-2 w-64">
                    {darkTheme ? (
                      <img src={websiteDark} alt="" className="w-3" />
                    ) : (
                      <img src={website} alt="" className="w-3" />
                    )}
                    <p
                      className={
                        darkTheme
                          ? "text-sm text-white"
                          : "text-sm text-[#4b6a9b]"
                      }
                    >
                      https://github.blog
                    </p>
                  </div>
                  <div className="flex items-center gap-4 p-2 w-64">
                    {darkTheme ? (
                      <img src={companyDark} alt="" className="w-3" />
                    ) : (
                      <img src={company} alt="" className="w-3" />
                    )}
                    <p
                      className={
                        darkTheme
                          ? "text-sm text-white"
                          : "text-sm text-[#4b6a9b]"
                      }
                    >
                      @github
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}

export default App;
