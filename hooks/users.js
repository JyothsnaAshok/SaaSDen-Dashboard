import { useEffect, useRef, useState } from "react";

let u = [];

const useUsers = () => {
  const refFetched = useRef(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (u.length) {
      setUserData(u);
    }
    const users = localStorage.getItem("users");
    if (!refFetched.current && !users) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
          const users = json.map((user) => ({ ...user, disabled: false }));
          setUserData(users);
          u = users;
          localStorage.setItem("users", JSON.stringify(users));
        })
        .catch((error) => setError(error));
      refFetched.current = true;
    } else {
      setUserData(JSON.parse(users));
      u = JSON.parse(users);
    }
  }, []);

  return {
    userData,
    isLoading: userData.length === 0 && !error,
    error,
  };
};

export default useUsers;
