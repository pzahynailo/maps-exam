import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share';

const googleLink = 'https://www.google.com/maps/place/';

export const ShareButtons = ({place}) => {
  if (!place.geometry) {
    return null;
  }
  const location = place.geometry.location;
  const shareUrl = `${googleLink}${location.lat()},${location.lng()}`;
  return (
    <React.Fragment>
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon
          borderRadius={4}
          size={32}
        />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl}>
        <TwitterIcon
          borderRadius={4}
          size={32}
        />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon
          borderRadius={4}
          size={32}
        />
      </LinkedinShareButton>
    </React.Fragment>
  );
};
