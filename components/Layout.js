import React from 'react';
import styled from 'styled-components';

const Layout = ({ children }) => (
  <StyledLayout>
    <header>header</header>
    {children}
    <footer>footer</footer>
  </StyledLayout>
);

const StyledLayout = styled.div`
  /* background-color: grey;
  color: white; */
`;

export default Layout;
