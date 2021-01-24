import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Pagination from "./Pagination";

const UserPost = (props) => {
  const userId = props.match.params.id;
  const [userPosts, setUserPosts] = useState("");
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsperpage] = useState(5);

  const getPosts = (userId) => {
    setloading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`)
      .then((response) => {
        setUserPosts(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPosts(userId);
  }, []);

  const backPage = () => {
    window.location.href = `/`;
  };

  //   Get current users
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="hero-section">
      <div className="row my-3 mb-4">
        <div className="col-2 d-flex align-self-start">
          <i className="fas fa-arrow-left" onClick={backPage} />
        </div>
        <div className="col-10 pl-5">
          <h3>User Latest Posts</h3>
        </div>
      </div>
      {loading && <Loader />}
      {userPosts &&
        currentPosts.map((post) => {
          return (
            <div className="card my-2" key={post.id}>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-2 user-icon d-flex align-self-center">
                    <i className="fas fa-newspaper" />
                  </div>
                  <div className="col-12 col-md-8 post-title d-flex align-self-center">
                    <h4 className='post-title'>{post.title}</h4>
                  </div>
                  <div className="col-12 col-md-2 d-flex align-self-center justify-content-end">
                    <Link to={`/post-details/userid/${userId}&${post.id}`}>
                      <button className="btn btn-md btn-danger btn-default">
                        View More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {userPosts && (
        <Pagination
          totalEntries={userPosts.length}
          entryPerPage={postsPerPage}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default UserPost;
