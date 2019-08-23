import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavBar = ({ pathname, authenticated }) => (
  <S.header>
    <Link href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>
    {authenticated
        && (
        <Link href="/profile">
          <a className={pathname === '/profile' ? 'is-active' : ''}>Profile</a>
        </Link>
        )
    }

    {!authenticated
    && (
    <Link href="/login">
      <a className={pathname === '/login' ? 'is-active' : ''}>Login</a>
    </Link>
    )
    }

    {!authenticated
        && (
        <Link href="/signup">
          <a className={pathname === '/signup' ? 'is-active' : ''}>Register</a>
        </Link>
        )
    }
    {authenticated
        && (
        <Link href="/logout">
          <a className={pathname === '/logout' ? 'is-active' : ''}>Logout</a>
        </Link>
        )
    }
  </S.header>
);

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default NavBar;


const S = {};
S.header = styled.header`
    margin-bottom: 25px;
   & a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
    &  .is-active {
        text-decoration: underline;
      }
`;
