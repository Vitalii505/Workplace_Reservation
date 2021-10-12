import React, { useRef, useState, useEffect } from "react";
import { coordinatesOfWorkplaces } from "./Coordinates";
import { useSelector, useDispatch } from "react-redux";
import { setWorkplace } from "../../redux/actions/place";
import Places from "./Places";

const Workplace = () => {
  const dispatch = useDispatch();
  const indicatorWorkplace = useSelector(
    ({ placeIndicator }) => placeIndicator
  );
  console.log("status--", indicatorWorkplace);

  const onSelectWorkplace = (index) => {
    dispatch(setWorkplace(index));
  };

  

  return (
    <div style={{}}>
      <div style={{ padding: 20 }}>
        <div
          style={{
            display: "inline-block",
            // border: "2px solid red",
            width: 1000,
            height: 500,
            backgroundImage:
              "url(https://www.arstelle-office.ru/public/userfiles/images/planirovka_ofisa_arstelle_office_01.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Places
            // placeWork={coordinatesOfWorkplaces}
            // onClickWorkplace={onSelectWorkplace}
            values={coordinatesOfWorkplaces}
          />
        </div>
      </div>
    </div>
  );
};

export default Workplace;
