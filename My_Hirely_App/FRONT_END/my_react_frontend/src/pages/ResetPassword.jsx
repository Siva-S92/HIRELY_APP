import React, { useState } from "react";
import Base from "../components/Base";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handleResetPassword = async () => {
    if (password !== password2) {
      setPasswordErr("password doesn't matching");
    } else {
      const payload = {
        email,
        password,
      };
      const response = await fetch(
        `http://localhost:8090/api/user/reset/password`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!data.message) {
        setErr(data.error);
      } else {
        setPasswordErr("");
        setMsg(data.message);
      }
      return;
    }
  };

  return (
    <>
      <Base />
      <div className="container">
        <h2 className="text-center text-danger fw-bold mt-2">Reset Password</h2>

        <form className="mt-5">
          <div className="container">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="text-danger" htmlFor="password2">
                Confirm Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            {passwordErr ? (
              <div id="errorblock" className="text-danger">
                {passwordErr}
              </div>
            ) : (
              ""
            )}

            <button
              type="button"
              className="btn btn-primary mt-2 px-5"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>

            {err ? (
              <div id="errorblock" className="text-danger">
                {err}
              </div>
            ) : (
              ""
            )}

            {msg ? (
              <div id="eoorblock" className="text-success">
                {msg}
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
