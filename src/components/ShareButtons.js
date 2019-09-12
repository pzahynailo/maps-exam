import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share';

const shareUrl = 'https://www.careebiz.com/';

export const ShareButtons = () => (
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
