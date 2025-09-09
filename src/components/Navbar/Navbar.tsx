import { NavLink } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  function getNavLinkClassName({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }): string {
    const status = isActive ? 'active' : isPending ? 'pending' : '';
    return 'nav-link ' + status;
  }

  return (
    <div className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to={`/`} className={getNavLinkClassName}>
            about me
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={`/blog`} className={getNavLinkClassName}>
            blog
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
