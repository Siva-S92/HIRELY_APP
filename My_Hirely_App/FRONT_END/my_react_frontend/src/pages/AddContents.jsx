import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function AddContents({userContents, setUserContents}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, []);

  const [title, setTitle] = useState("");
  const [profile_photo, setProfile_Photo] = useState(null);
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  //adding files
  const fileOnchange = (e) => {
    setProfile_Photo(e.target.files[0]);
    console.log(e.target.files[0]);
}

  //api integration
  async function postnewContent(e) {
    e.preventDefault();
    const contents = {
      title,
      profile_photo,
      skills,
      description,
    };
    const response = await axios.post(`http://localhost:8090/api/content/user/add`, contents, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const data = await response.data
    if(!data.data){
      setErr(data.error)
    }else {
      setUserContents([...userContents, data.data]);
      setTitle("");
      document.getElementById("profile_photo").value = "";
      setSkills("");
      setDescription("");
      setMsg(data.message);
    }

  }

  return (
    <>
      <Base />
      <div className="container">
        <h1 className="text-center mt-2">Add Your Posts</h1>
      </div>
      <form onSubmit={postnewContent}>
        <div className="container">
          <div className="form-group mb-3">
            <label htmlFor="title">Add Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="profile_photo">Add Your Photo:</label>
            <input
              type="file"
              className="form-control"
              id="profile_photo"
              name="profile_photo"
              onChange={fileOnchange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="skills">Add Your Skills:</label>
            <input
              type="text"
              className="form-control"
              id="skills"
              name="skills"
              onChange={(e) => setSkills(e.target.value)}
              value={skills}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description">Add Description:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2 px-5">
            Add Posts
          </button>

          {err ? (
            <div id="eoorblock" className="text-danger">
              {err}
            </div>
          ) : (
            ""
          )}

          {msg ? (
            <div id="msgblock" className="text-success">
              {msg}
            </div>
          ) : (
            ""
          )}
        </div>
      </form>

      <div className='container mt-5 text-center'>
        <button type="button" className='btn btn-sm btn-outline-success px-4' onClick={()=> navigate("/")}>Go to home and check there your post</button>
      </div>
    </>
  );
}

export default AddContents;
