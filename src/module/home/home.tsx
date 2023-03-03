import { useCallback, useEffect, useState } from "react";
import { getAllUsers } from "../../api";
import { UserDetailResponse } from "../../types/UserType";
import "./../../assets/css/home.css";

export const Home = () => {
  const [users, setUsers] = useState<UserDetailResponse[]>([]);
  const fetchAllUser = useCallback(async () => {
    try {
      const response = await getAllUsers();
      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetchAllUser();
      if (response.status) {
        setUsers(response.users);
      } else {
        setUsers([]);
      }
    })();
  }, [fetchAllUser]);

  return (
    <>
      <h1>Users List</h1>
      <div className="container">
        <table border={1} cellSpacing={0}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{`${user.firstname} ${user.lastname}`}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
