import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import ShowComments from "./ShowComments";

const PostDetails = (props) => {
  const userId = props.match.params.uid;
  const postId = props.match.params.pid;
  const [posts, setPosts] = useState("");
  const [loading, setloading] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const getPost = (postId) => {
    setloading(true);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/?userId=${userId}&id=${postId}`
      )
      .then((response) => {
        setPosts(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        console.log(response.data);
        if (window.confirm("Are you sure to delete?") == true) {
          window.location.href = `/users-posts/userid/${userId}`;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const backPage = () => {
    window.location.href = `/users-posts/userid/${userId}`;
  };

  const toggleComments = () => {
    setShowComponent(!showComponent);
  };

  useEffect(() => {
    getPost(postId);
  }, []);
  return (
    <div className="hero-section">
      {loading && <Loader />}
      {posts &&
        posts.map((post) => {
          return (
            <div className="post-details" key={post.id}>
              <div className="row">
                <div className="col d-flex align-self-start">
                  <i className="fas fa-arrow-left" onClick={backPage} />
                </div>
                <div className="col d-flex justify-content-end delete-btn">
                  <button
                    onClick={deletePost}
                    className="btn btn-danger btn-del align-self-center"
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                </div>
              </div>
              <div className="row mt-3">
                <h3 className='post-title'>{post.title}</h3>
              </div>
              <div className="row justify-content-center my-3">
                <img
                  src={`https://source.unsplash.com/1600x900/?nature,water,travel,mobiles`}
                  className="img img-fluid"
                />
              </div>
              <div className="row mb-3">
                <p className='post-body'>{post.body}</p>
              </div>
              <div className="row mb-3 show-comment-btn">
                <button onClick={toggleComments} className="btn btn-danger btn-md btn-default">
                  {!showComponent ? "Show Comments" : "Hide Comments"}
                </button>
              </div>
              {showComponent && <ShowComments postId={post.id} />}
            </div>
          );
        })}
    </div>
  );
};

export default PostDetails;
