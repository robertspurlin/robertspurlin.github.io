import { NavLink } from "react-router-dom";

const NavigationLink = ({to, children}) => {
  return (
    <NavLink
      to={to}
      className={linkState =>
        "nav-link" + (linkState.isActive ? ' active' : '')
      }
    >
      {children}
    </NavLink>
  )
}

export default NavigationLink;