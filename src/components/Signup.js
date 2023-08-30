import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(e);
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { username, email, password } = user;

    try {
      const res = await fetch(
        "https://projectdemobackend1.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      // if (data.status === 422 || !data) {
      //   window.alert("Invalid Registration");
      if (data.status === 200) {
        console.log(res);
        alert("Registered successfully!");
        history.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        window.alert("Registration Unsuccessful");
        history.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("Error during registration");
    }
  };

  return (
    <>
      <section className="sign-in">
        <form method="POST">
          <div className="form-group" class="mb-2 row mt-2 m-1">
            <label htmlFor="username" className="col-sm-1 col-form-label">
              Username
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={handleInputs}
                placeholder="enter your username"
              />
            </div>
          </div>

          <div className="form-group" class="mb-2 row m-1">
            <label htmlFor="email" className="col-sm-1 col-form-label">
              Email
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInputs}
                placeholder="enter your email ID"
              />
            </div>
          </div>

          <div className="form-group" class="mb-3 row mb-2 m-1">
            <label htmlFor="password" className="col-sm-1 col-form-label">
              Password
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInputs}
                placeholder="enter your password"
              />
            </div>
          </div>

          <div className="col-auto m-3 mb-4 mt-1">
            <input
              type="submit"
              name="signup"
              id="signup"
              className="form-submit custom-button"
              value="Register"
              onClick={PostData}
            />
          </div>
        </form>
      </section>

      <NavLink to="/home"> I am already registered</NavLink>
    </>
  );
};

export default Signup;
