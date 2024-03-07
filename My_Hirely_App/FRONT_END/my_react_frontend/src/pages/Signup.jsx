import React, { useState } from "react";
import Base from "../components/Base";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const payload = {
      username,
      email,
      password,
    };
    const response = await fetch(`http://localhost:8090/api/user/signup`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setErr(data.error);
    }
  };

  return (
    <>
      <Base />
      <div className="container">
        <h1 className="text-center mt-2">Signup Form</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usename
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary px-5"
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>
        {err ? (
          <div id="eoorblock" className="text-danger">
            {err}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Signup;
