import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const ShowComments = ({ postId }) => {
  const [comments, setComments] = useState("");
  const [loading, setloading] = useState(false);

  const getComments = (postId) => {
    setloading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => {
        setComments(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getComments(postId);
  }, []);

  return (
    <div className="card-body mt-4">
      {loading && <Loader />}
      {comments &&
        comments.map((comment) => {
          return (
            <div key={comment.id} className="row">
              <div className="col-12 col-md-2 -flex align-self-center comments-user">
                <div className="comments-user">
                  <i className="fas fa-user" />
                </div>
              </div>
              <div className="col-12 col-md-10 comments">
                <p className='comment-body'>{comment.body}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShowComments;
