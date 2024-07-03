import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useAuth0 } from '@auth0/auth0-react';

function Logout() {
  const { logout } = useAuth0();

  return (
    <MDBBtn onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </MDBBtn>
  );
}

export default Logout;
