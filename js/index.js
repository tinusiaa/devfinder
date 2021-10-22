const toggleThemeButton = document.getElementById("toggle-theme");
const searchName = document.getElementById("search-user");

const toggleTheme = (event) => {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
    event.target.innerHTML = 'Dark  <i class="icon-moon-inv"></i>';
  } else {
    setTheme("theme-dark");
    event.target.innerHTML = 'Light  <i class="icon-sun-filled"></i>';
  }
};

const setTheme = (themeName) => {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
};

const setTextToElement = (id, data, defaultValue) => {
  document.getElementById(id).innerText = data || defaultValue;
};

async function fetchUser() {
  const name = document.getElementById("input-name").value;
  const userData = await fetch(`https://api.github.com/users/${name}`);
  return userData.json();
}

const displayUserData = () => {
  const userData = fetchUser();
  userData.then((data) => {
    document.getElementById("user-image").src =
      data["avatar_url"] || "images/default.png";
    setTextToElement("username", data["name"], "No name");
    document.getElementById("joined-date").innerText = data["created_at"]
      ? `Joined ${new Date(data["created_at"]).toLocaleDateString()}`
      : "";
    setTextToElement("bio", data["bio"], "No bio");
    setTextToElement("repos-value", data["public_repos"], 0);
    setTextToElement("followers-value", data["followers"], 0);
    setTextToElement("following-value", data["following"], 0);
    setTextToElement("user-location", data["location"], "No location");
    setTextToElement("user-twitter", data["twitter_username"], "No twitter");
    if (data["twitter_username"]) {
      document.getElementById(
        "user-twitter"
      ).href = `https://twitter.com/${data["twitter_username"]}`;
    } else document.getElementById("user-twitter").removeAttribute("href");
    setTextToElement("user-blog", data["blog"], "No blog");
    if (data["blog"]) {
      document.getElementById("user-blog").href = data["blog"];
    } else document.getElementById("user-blog").removeAttribute("href");
    setTextToElement("user-company", data["company"], "No company");
  });
};

(function () {
  setTheme("theme-dark");
  toggleThemeButton.addEventListener("click", toggleTheme, false);
  searchName.addEventListener("click", displayUserData, false);
})();
