function onLogin() {
  const password = document.getElementsByName("loginPassword")[0].value;
  const username = document.getElementsByName("loginUsername")[0].value;
  const users = localStorage.getItem("users");
  const userList = users ? JSON.parse(users) : [];
  const hasLogin = userList.find(
    (user) => user.username === username && user.password === hashCode(password)
  );
  if (hasLogin) {
    location.href = "./chatList.html";
    localStorage.setItem("currentLogin", JSON.stringify(hasLogin));
    document.getElementById("wrongLogin").style.display = "none";
  } else {
    document.getElementById("wrongLogin").style.display = "block";
  }
}

function onRegister() {
  const username = document.getElementsByName("username")[0].value;
  const nickname = document.getElementsByName("nickname")[0].value;
  const password = document.getElementsByName("password")[0].value;
  const confirmPassword =
    document.getElementsByName("confirmPassword")[0].value;
  const users = localStorage.getItem("users");
  const userList = users ? JSON.parse(users) : [];
  const hasLogin = userList.find((user) => user.username === username);
  if (password !== confirmPassword) {
    alert("Verify password does not match.");
    document.getElementById("successRegister").style.display = "none";
  } else {
    if (hasLogin) {
      alert("Username already exists.");
      document.getElementById("successRegister").style.display = "none";
    } else {
      userList.push({ username, password: hashCode(password), nickname });
      localStorage.setItem("users", JSON.stringify(userList));
      location.href = `./registerSuccess.html?${nickname}`;
      //   document.getElementById("successRegister").style.display = "block";
    }
  }
}

function showChat(username) {
  location.href = `./chatPage.html?${username}`;
}

function chatLoad() {
  const searchText = window.location.search.substring(1);
  document.getElementById("user").innerHTML = searchText;
}

function hashCode(str) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function chatListLoad() {
  const user = localStorage.getItem("currentLogin");
  const nickname = user ? JSON.parse(user).nickname : "";
  document.getElementById("welcomeText").innerHTML = `Welcome ${nickname}`;
}

function registerSuccessLoad() {
  const nickname = window.location.search.substring(1);
  document.getElementById(
    "registerSuccess"
  ).innerHTML = `${nickname} you Successfully register your account!`;
}
