import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../utils/navigation'
import { useUser } from '../../utils/context/useUser'

function Header({ items = navigationItems }: { items?: typeof navigationItems }) {
    const { user } = useUser()

    return (
        <header className="site-header">
            <NavLink className="site-brand" to="/">RATP</NavLink>
            <nav aria-label="Navigation principale">
                <ul className="site-navigation">
                    {items.filter(item => !item.hidden).map(({ to, label }) => (
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
                        <span>Bonjour {user.name}</span>
                        <small>({user.role === 'respo' ? 'Responsable' : 'Agent'})</small>
                        <span>Se déconnecter</span>
                    </>
                ) : <span>Non connecté</span>}
            </div>
        </header>
    )
}

export default Header
