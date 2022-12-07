import Head from "next/head";
import Styles from "../styles/pages/Users.module.scss";
import { Input, Button } from "antd";
import { BsSearch } from "react-icons/bs";
import UserList from "../components/UserList";
import { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([]);

  const onSearch = (value) => {
    console.log(value);
    // filter users by name
    const filteredUsers = userList.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredUsers);
    setUsers(filteredUsers);
  };

  const onSwitchChange = (checked, id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, disabled: checked };
      }
      return user;
    });
    console.log(updatedUsers);
    // sort users by disabled property
    updatedUsers.sort((a, b) => {
      if (a.disabled && !b.disabled) {
        return 1;
      }
      if (!a.disabled && b.disabled) {
        return -1;
      }
      return 0;
    });
    console.log(updatedUsers);
    setUsers(updatedUsers);
    setUserList(updatedUsers);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      // add a disable property to each user
      const users = data.map((user) => ({ ...user, disabled: false }));
      console.log(users);
      setUsers(users);
      setUserList(users);
    };
    fetchData();
  }, []);

  return (
    <div className={Styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={Styles.header}>
        <div className={Styles.pageHeading}>Users</div>
        <Input
          size="large"
          placeholder="Search"
          prefix={<BsSearch />}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button size="large">Search</Button>
      </div>
      <UserList users={users} onSwitchChange={onSwitchChange} />
    </div>
  );
}
