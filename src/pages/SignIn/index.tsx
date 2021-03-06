import React, { useState, FormEvent, ChangeEvent } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { SignInFormSchema } from "../../helpers/Forms/schemas";
import { signInRequest, signInGithub } from "../../store/ducks/auth/actions";
import { User } from "../../store/ducks/auth/types";

import "./styles.css";

interface AuthState {
  user: User | null;
}

const SignIn: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector<ApplicationState, AuthState>((state) => ({
    user: state.auth.user,
  }));

  const [payload, setPayload] = useState<SignInFormSchema>({
    email: "",
    password: "",
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(signInRequest(payload));
    return history.push("/todos");
  }

  async function handleSignInGithub() {
    dispatch(signInGithub());
    return history.push("/todos");
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setPayload({ ...payload, [name]: value });
  }

  if (user) {
    return <Redirect to="/todos" />;
  }

  return (
    <div id="signin-page">
      <section className="header">
        <strong>Logue na sua conta</strong>
      </section>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
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
              type="password"
              value={payload.password}
              onChange={handleChange}
              required
            />
          </fieldset>
          <button className="form-button" type="submit">
            Entrar
          </button>
          <p>Ainda não têm conta?</p>
          <Link to="/cadastro">Cadastre-se</Link>
        </form>
        <hr className="divider" />
        <button
          className="form-button"
          id="github"
          onClick={handleSignInGithub}
        >
          Entrar com Github
        </button>
      </div>
    </div>
  );
};

export default SignIn;
