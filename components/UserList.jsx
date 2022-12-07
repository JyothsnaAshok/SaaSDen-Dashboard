import React, { useEffect } from "react";
import { List, Typography, Switch, Row } from "antd";
import Styles from "../styles/components/UserList.module.scss";
import { useState } from "react";

export default function UserList({ users, onSwitchChange }) {
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
