import { useState, type SyntheticEvent } from "react";
import { useApi } from "../../utils/hooks/useApi";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const { login } = useApi();

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    try {
      const user = await login(email, password);
      console.log("Connexion bien réalisée avec", user);
      navigate("/");
    } catch {
      setError("L'authentification a échoué");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <div className="login-field">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="nom@exemple.fr"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <div className="login-password-label">
              <label htmlFor="password">Mot de passe</label>
            </div>

            <div className="login-password-input">
              <input
                id="password"
                name="password"
                type={"password"}
                autoComplete="current-password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>

          <button
            className="login-submit"
            type="submit"
          >
            {"Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
