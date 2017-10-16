import React from 'react';

import { Menu } from 'semantic-ui-react'


export default PublicHeader = (props) => {

  return (
    <Menu>
      <Menu.Item
      className="header__title">
        {props.title}
      </Menu.Item>
    </Menu>
  );
};
