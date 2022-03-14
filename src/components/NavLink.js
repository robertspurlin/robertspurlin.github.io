import React from 'react';
import { Link } from '@reach/router';

/**
 * I'm really not happy that getProps doesn't pass the props obj that I can manipulate and return...
 */
const isActive = ({ isCurrent, href }) => {
  let className = 'nav-link';
  let activeClassName = 'active';

  if (href === '/') {
    className = 'navbar-brand py-3';
    activeClassName = '';
  }

  return isCurrent ? { className: className + ' ' + activeClassName } : { className: className };
}

const NavLink = props => {
  return (
    <Link getProps={isActive} {...props} />
  )
}

export default NavLink;