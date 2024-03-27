import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaBlockSkeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={360}
    height={466}
    viewBox="0 0 360 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="266" rx="10" ry="10" width="360" height="27" />
    <rect x="0" y="306" rx="10" ry="10" width="360" height="88" />
    <rect x="1" y="419" rx="10" ry="10" width="110" height="38" />
    <rect x="142" y="411" rx="25" ry="25" width="135" height="52" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
