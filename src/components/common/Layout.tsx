import Header from './Header'
import { useUser } from "../../utils/context/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Layout({ children }: {children: React.ReactNode }) {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <>
      <Header />
      <div id="main-content" className="page-content" tabIndex={-1}>
        {children}
      </div>
    </>
  )
}

export default Layout
