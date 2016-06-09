import * as React from 'react';

const CategoryNavigation = ({categories}) => {
  const categoryNodes = categories.map((category) => {
    return <li key={category}>{category}</li>;
  });

  return (
    <ul>
      {categoryNodes}
    </ul>
  );
}

export default CategoryNavigation;
