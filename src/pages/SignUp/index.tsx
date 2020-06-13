import React, { useState, FormEvent, ChangeEvent } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeftCircle } from "react-icons/fi";
import Checkbox from "../../components/Checkbox";
import { ApplicationState } from "../../store";
import { SignUpFormSchema } from "../../helpers/Forms/schemas";
import { signUpRequest } from "../../store/ducks/auth/actions";
import { User } from "../../store/ducks/auth/types";

import "./styles.css";

interface AuthState {
  user: User | null;
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector<ApplicationState, AuthState>((state) => ({
    user: state.auth.user,
  }));

  const [showPassword, setShowPassword] = useState(false);

  const [payload, setPayload] = useState<SignUpFormSchema>({
    email: "",
    name: "",
    password: "",
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(signUpRequest(payload));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setPayload({ ...payload, [name]: value });
  }

  if (user) {
    return <Redirect to="/todos" />;
  }

  return (
    <div id="signup-page">
      <section className="header">
        <Link to="/login">
          <FiArrowLeftCircle size={24} color="#fff" />
        </Link>
        <strong>Cadastre-se</strong>
      </section>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <fieldset className="form-fieldset">
            <label className="form-label" htmlFor="name">
              Nome
            </label>
            <br />
            <input
              className="form-input"
              name="name"
              id="name"
              type="text"
              value={payload.name}
              onChange={handleChange}
              required
            />
          </fieldset>
          <fieldset className="form-fieldset">
            <label className="form-label" htmlFor="email">
              E-mail
            </label>
            <br />
            <input
              className="form-input"
              name="email"
              id="email"
              type="email"
              value={payload.email}
              onChange={handleChange}
              required
            />
          </fieldset>
          <fieldset className="form-fieldset">
            <label className="form-label" htmlFor="password">
              Senha
            </label>
            <br />
            <input
              className="form-input"
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={payload.password}
              onChange={handleChange}
              required
            />
          </fieldset>
          <Checkbox
            label={"Mostrar senha"}
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <button className="form-button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
