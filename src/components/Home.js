import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Pagination from "./Pagination";

const Home = () => {
  const [users, setUsers] = useState("");
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersperpage] = useState(5);

  const fetchUsers = () => {
    setloading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //   Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className='hero-section'>
      <div className="row my-3 mb-4 justify-content-center">
        <div className="col">
          <h3>User Latest Posts</h3>
        </div>
      </div>
      {loading && <Loader />}
      {currentUsers &&
        currentUsers.map((user) => {
          return (
            <div className="card my-2" key={user.id}>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-2 user-icon d-flex align-self-center">
                    <i className="fas fa-user" />
                  </div>
                  <div className="col-12 col-md-8 user-info d-flex align-self-center">
                    <h4>
                      {user.name}
                      <br />
                      <span>Company : {user.company.name}</span>
                    </h4>
                  </div>
                  <div className="col-12 col-md-2 d-flex align-self-center justify-content-end">
                    <Link to={`/users-posts/userid/${user.id}`}>
                      <button className="btn btn-md btn-danger btn-default">
                        View Posts
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {users && (
        <Pagination
          totalEntries={users.length}
          entryPerPage={usersPerPage}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default Home;
