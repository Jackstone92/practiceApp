import React from 'react';

import Login from './Login/Login';
import PublicHeader from './Header/PublicHeader';

export default Home = () => {
  return(
    <div>
      <PublicHeader title="Practice Perfect" />
      <Login />
    </div>
  );
}
