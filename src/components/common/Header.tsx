import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../utils/navigation'
import { useUser } from '../../utils/context/useUser'
import { useApi } from '../../utils/hooks/useApi'

function Header({ items = navigationItems }: { items?: typeof navigationItems }) {
    const { user } = useUser()
    const { logout } = useApi();

    return (
        <header className="site-header">
            <NavLink className="site-brand" to="/">RATP</NavLink>
            <nav aria-label="Navigation principale">
                <ul className="site-navigation">
                    {items.filter(item => !item.hidden &&
                        (!(item as { role?: string }).role ||
                            (item as { role?: string }).role === user?.role)).map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end
                                className={({ isActive }) => isActive ? 'navigation-link active' : 'navigation-link'}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="header-user">
                {user ? (
                    <>
                        <div className="header-user-details">
                            <span>Bonjour {user.prenom}</span>
                            <small>({user.role === 'AGENT' ? 'Agent' : 'Responsable'})</small>
                        </div>
                        <button onClick={async () => await logout()}>Se déconnecter</button>
                    </>
                ) : <span>Non connecté</span>}
            </div>
        </header>
    )
}

export default Header
