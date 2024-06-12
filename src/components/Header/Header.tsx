import { useState } from "react";
import style from "./Header.module.scss";
import clsx from "clsx";
import Links from "./Links";
import Nav from "./Nav";
import Logo from "@/UI/logo/Logo";

const Header = () => {
  const [isMenu, setMenu] = useState(true);

  // useEffect(() => {
  //   yearRref.current!.innerHTML = new Date().getFullYear().toString();
  // }, []);
  return (
    <header className={clsx(style.header)}>
      <div className={clsx(style.header__inner)}>
        <Logo parent={"header"} />

        <Nav isMenu={isMenu} setMenu={setMenu}>
          <Links setMenu={setMenu} />
        </Nav>
      </div>
    </header>
  );
};
export default Header;
