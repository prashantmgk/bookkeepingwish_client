import React from 'react';
import {hasChildren} from '../../utils';
import SingleLevel from './SingleLevel';
import MultiLevel from './MultiLevel';

const MenuItem = ({ item, handleDrawerToggle}) => {
   const Component = hasChildren(item) ? MultiLevel : SingleLevel;
   return <Component 
      item={item} 
      handleDrawerToggle={handleDrawerToggle}
   />;
};

export default MenuItem;
 