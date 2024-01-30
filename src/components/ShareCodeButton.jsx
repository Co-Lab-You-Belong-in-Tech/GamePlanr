import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

const ShareCodeButton = ({ children, teamCode }) => {
  const shareUrl = `Join our team with this code: ${teamCode}`;
  const title = 'Join Our Team';

  return (
    <>
      <FacebookShareButton url={shareUrl} quote={title}>
        {children}
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        {children}
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={title}>
        {children}
      </WhatsappShareButton>
      {/* Add more share buttons as needed */}
    </>
  );
};

export default ShareCodeButton;
