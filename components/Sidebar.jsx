// functional component
import React from "react";
import Styles from "../styles/components/Sidebar.module.scss";
import {
  MdOutlineSpaceDashboard,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.slice(1);

  // check if the path is the same as the link, the apply active style else apply inactive style
  const isActive = (link) => {
    if (link === path) {
      return Styles.active;
    } else {
      return Styles.inactive;
    }
  };

  const renderIcon = (link) => {
    if (link === path) {
      return <MdRadioButtonChecked />;
    } else {
      return <MdRadioButtonUnchecked />;
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <MdOutlineSpaceDashboard /> Dashboard
      </div>
      <ul className={Styles.menu}>
        <Link href="/users">
          <li className={isActive("users")}>
            {renderIcon("users")}
            Users
          </li>
        </Link>
        <Link href="/groups">
          <li>
            {renderIcon("groups")}
            Groups
          </li>
        </Link>
        <li>
          {renderIcon("settings")}
          Settings
        </li>
        <li>
          {renderIcon("help")}
          Help
        </li>
      </ul>
      <div className={Styles.divider}></div>
      <div className={Styles.footer}>More features coming soon! </div>
    </div>
  );
}
