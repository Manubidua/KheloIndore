import React, { useState, useEffect } from 'react';
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath';
import { useLocation } from 'react-router';

const Loader = () => {

  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  return (
    <div>
      {isLoading && (
        <div id="global-loader">
          <div className="loader-img">
            <ImageWithBasePath src="../../../assets/img/Animation-loader.gif" className="img-fluid" alt="loader" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
