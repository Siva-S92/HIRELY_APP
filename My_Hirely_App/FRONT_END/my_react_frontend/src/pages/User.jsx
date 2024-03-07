import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useNavigate } from 'react-router-dom';

function User({userContents, setUserContents}) {
  const navigate = useNavigate();

  const [err, setErr] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }

    const fetchData = async () => {
      const response = await fetch("http://localhost:8090/api/content/user/all", {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      const data = await response.json();
      if (!data.data) {
        setErr(data.error);
      } else {
        setUserContents(data.data);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8090/api/content/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },

    })
    const data = res.json();
    const newUserContents = userContents.filter((data)=> data._id != id);
    setUserContents([...newUserContents])
  }

  return (
    <>
        <Base/>
        <div className='container'>
            <h1 className='text-center mt-2'>My Posts</h1>
        </div>

        <div className='text-center'>
          <button className='btn btn-outline-success px-5 m-1' onClick={() => navigate("/addcontents")}>Add Posts</button>
        </div>


        {userContents && (
        <div className="container">
          {userContents?.map((data) => (
            <div  key={data._id} className='border rounded py-2 mt-2 w-75 mx-auto text-center' style={{backgroundColor: "OldLace"}}>
              <h5>Title: {data.title} </h5>
              <div>
                <img src={`http://localhost:8090/${data.profile_photo}`} alt="" className='rounded mb-3' style={{width: "30%", height: "13rem", }}/>
              </div>
              <p className="px-2">Skills: {data.skills} </p>
              <p className="px-2">Description: {data.description} </p>
              <p>Date: {data.date} </p>
              <p>Posted By: {data.user.username} </p>
              <p>Email: {data.user.email} </p>
              <button type='button' className='btn btn-sm- btn-outline-primary py-0 px-4 m-1 opacity-75' onClick={ () => navigate(`/edit/${data._id}`) }>Edit</button>
              <button type='button' className='btn btn-sm- btn-outline-danger py-0 px-4 m-1 opacity-75' onClick={ () => handleDelete(data._id)} >Delete</button>
            </div>
          ))}
          {err ? (
            <div id="eoorblock" className="text-danger">
              {err}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  )
}

export default User