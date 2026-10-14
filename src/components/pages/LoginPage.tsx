import { useState, type SyntheticEvent } from "react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    try {
      console.log("TODO : APPEL DE L'API AVEC", email, password);
    } catch {
      setError("L'authentification a échoué");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand" aria-hidden="true">
          <span className="login-brand-icon">✦</span>
        </div>

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
