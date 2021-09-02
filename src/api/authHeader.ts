const authHeader = () => {
  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  console.log("USER ", user);
  console.log("AUTH HEADER");

  if (user && user.token) {
    console.log("user");
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    };
  } else {
    console.log("no user");
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "NOPE",
    };
  }
};

export default authHeader;
