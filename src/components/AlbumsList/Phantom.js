import React from "react";
import PhantomItem from "../AlbumItem/Phantom";

import "./index.scss";

const PhantomList = props => {
  return <div className="row">
    {
      [...Array(props.amount)].map((element, index) => (
        <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">
          <PhantomItem />
        </div>
      ))
    }
  </div>;
}

PhantomList.defaultProps = {
  amount: 1,
};

export default PhantomList;
