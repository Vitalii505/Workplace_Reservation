import React, { useRef, useState, useEffect } from "react";

const Workplaces = () => {
  const [places, setPlaces] = useState([]);

  const ref = useRef();

  const handleClick = (e) => {
    // Get the target
    const target = e.target;

    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect();

    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    places.push({ x, y });
    setPlaces([...places]);
  };

  console.log([...places]);

  useEffect(() => {
    ref.current.addEventListener("mousedown", handleClick);
    return () => {
      ref.current.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);

  return (
    <div style={{}}>
      <div style={{ padding: 20 }}>
        <div
          ref={ref}
          style={{
            display: "inline-block",
            border: "2px solid red",
            width: 1000,
            height: 500,
            backgroundImage:
              "url(https://www.arstelle-office.ru/public/userfiles/images/planirovka_ofisa_arstelle_office_01.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            // width: "100%",
            // height: 500,
            // border: "1px solid black",
            position: "relative",
          }}
        >
          {places && places.length
            ? places.map((item) => (
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "red",
                    top: item.y,
                    left: item.x,
                    position: "absolute",
                  }}
                ></div>
              ))
            : null}

          {[...places].map((coord) => (
            <div
              style={{
                border: "solid 2px red",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                top: coord.y,
                left: coord.x,
                position: "absolute",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workplaces;
