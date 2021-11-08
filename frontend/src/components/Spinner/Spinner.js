import React from 'react'
import Lottie from 'react-lottie';
import LoaderAnimation from '../../assets/animations/lottie-loader.json'

const Spinner = () => {

    const loaderOptions = {
        loop: true,
        autoplay: true,
        animationData: LoaderAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div className="loading">
        <Lottie options={loaderOptions}
          height={190}
          width={400} />
      </div>
    )
}

export default Spinner
