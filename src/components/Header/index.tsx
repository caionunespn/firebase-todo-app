import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdPerson } from "react-icons/io";
import { ApplicationState } from "../../store";
import { signOut } from "../../store/ducks/auth/actions";
import { User } from "../../store/ducks/auth/types";

import "./styles.css";

interface HeaderState {
  user: User | null;
}

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector<ApplicationState, HeaderState>((state) => ({
    user: state.auth.user,
  }));

  const [toggle, setToggle] = useState(false);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <header id="app-header">
      <nav></nav>
      <section>
        <button
          className={toggle ? "dropdown-toggle active" : "dropdown-toggle"}
          onClick={() => setToggle(!toggle)}
        >
          {user?.image && <img src={user?.image} alt={user?.name} />}
          {!user?.image && <IoMdPerson color="#fff" size={24} />}
          <p>{user?.name}</p>
        </button>
        <section className={toggle ? "dropdown active" : "dropdown"}>
          <button onClick={handleSignOut}>Sair</button>
        </section>
      </section>
    </header>
  );
};

export default Header;
