import React, { useState, FormEvent, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithGithub } from "../../firebase";
import { signInRequest } from "../../store/ducks/auth/actions";

import "./styles.css";

interface SignInSchema {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState<SignInSchema>({
    email: "",
    password: "",
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    return history.push("/todos");
  }

  async function handleSignInGithub() {
    const result = await signInWithGithub();

    if (result) {
      dispatch(signInRequest(result));
      history.push("/todos");
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setPayload({ ...payload, [name]: value });
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
        </form>
        <p>Ou</p>
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
