import { useState, type SyntheticEvent } from "react";
import { useApi } from "../../utils/hooks/useApi";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const { login } = useApi();

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    try {
      const user = await login(username, password);
      console.log("Connexion bien réalisée avec", user);
      navigate("/");
    } catch {
      setError("L'authentification a échoué");
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
        {error && (
        <div className="login-error" role="alert">
            {error}
        </div>
        )}

        <div className="login-field">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="ex. agent1"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
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

        <button className="login-submit" type="submit">
            {"Se connecter"}
        </button>
    </form>
  );
}
