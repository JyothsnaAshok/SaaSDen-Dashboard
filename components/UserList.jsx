import React, { useEffect } from "react";
import { List, Typography, Switch, Row } from "antd";
import Styles from "../styles/components/UserList.module.scss";
import { useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

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
    };
    fetchData();
  }, []);

  return (
    <div className={Styles.userListWrapper}>
      <List
        header={<div>User List</div>}
        bordered
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            <div className={Styles.userListItem}>
              {/* show disabled property of user */}
              {item.disabled ? (
                <strike>{item.name}</strike>
              ) : (
                <div>{item.name}</div>
              )}

              <div>
                {/* change disabled to true for that user on switch change */}
                <Switch
                  checked={item.disabled}
                  onChange={(checked) => onSwitchChange(checked, item.id)}
                />
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
