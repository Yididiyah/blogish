/* eslint-disable import/prefer-default-export */
const size = {
  mobile: '600px',
  mobileWL: '601px',
  mobileHL: '600px',
  tablet: '768px',
  laptop: '992px',
  desktop: '1200px',
};

const device = {
  mobile: `(max-width: ${size.mobile}) `,
  tablet: `(min-width: ${size.mobileL}) and (max-width: ${size.laptop})`,
  laptop: `(min-width: ${size.laptop}) and (max-width: ${size.desktop})`,
  desktop: `(min-width: ${size.desktop})`,
  notMobile: `(min-width: ${size.mobileWL})`,
  mobileLandscape: `(min-width: ${size.mobileWL}) and (max-height: ${size.mobileWL})`,
};

export default device;
