import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Loader = ({loading}) => {
  return (
    <div className={`h-screen w-screen fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 ${loading ? '': 'hidden'}`}>
      <PropagateLoader
       color="white"
       size={30}
       loading={loading} />
    </div>
  );
};

export default Loader;