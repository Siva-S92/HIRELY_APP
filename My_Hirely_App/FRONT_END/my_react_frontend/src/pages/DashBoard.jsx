import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate("/");

  const [contents, setContents] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }

    const fetchData = async () => {
      const response = await fetch(`http://localhost:8090/api/content/all`, {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (!data.data) {
        setErr(data.error);
      } else {
        setContents(data.data);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Base />
      <div className="container">
        <h1 className="text-center mt-2">Job Finder</h1>
        <div className="text-center fs-4 fw-bold text-danger">All the posts aroud the world</div>
      </div>
      {contents && (
        <div className="container">
          {contents?.map((data) => (
            <div key={data._id} className='border rounded py-2 mt-2 w-75 mx-auto text-center' style={{backgroundColor: "WhiteSmoke"}}>
              <h4>Title: {data.title} </h4>
              <div>
                <img src={`http://localhost:8090/${data.profile_photo}`} alt="" className="rounded-circle border mb-3" style={{width: "30%", height: "13rem"}}/>
              </div>
              <p className="px-2">Skills: {data.skills} </p>
              <p className="px-2">Description: {data.description} </p>
              <p>Date: {data.date} </p>
              <p>Posted By: {data.user.username} </p> 
            </div>
          ))}
          {err ? (
            <div id="errorblock" className="text-danger">
              {err}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default DashBoard;
