// src/components/LottieAnimation.jsx

import { Player } from '@lottiefiles/react-lottie-player';

const LottieAnimation = ({ src, width = '300px', height = '300px', loop = true, autoplay = true }) => {
  return (
    <div className="flex justify-center items-center">
      <Player
        autoplay={autoplay}
        loop={loop}
        src={src}
        style={{ height: height, width: width }}
      />
    </div>
  );
};

export default LottieAnimation;
