import React, { useState, useEffect, useReducer, useRef } from "react";
import { SliderItem, SliderContainer, SliderWrapper } from "./styles";

const Slider = ({ dir = "ltr" }) => {
  const sliderRef = useRef(null);
  const slideItemRef = useRef(null);
  const width = useWindowWidth(slideItemRef);
  // sliderRef.scrollLeft = 100;
  // console.log(sliderRef);
  const scrollToLeft = () => {
    // console.log(slideItemRef.current.clientWidth);
    dir === "rtl"
      ? (sliderRef.current.scrollLeft = state.items.length * width)
      : (sliderRef.current.scrollLeft = 0);
  };
  useEffect(scrollToLeft);
  console.log({ currentWidth: width }, [dir]);

  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    sliderRef: null,
    slideItemRef: null,
    items: [
      { id: 1, name: "1" },
      { id: 2, name: "2" },
      { id: 3, name: "3" },
      { id: 4, name: "4" },
      { id: 5, name: "5" }
    ]
  });

  return (
    <div>
      <SliderContainer
        ref={sliderRef}
        className={"slider-instance"}
        height={"300px"}
      >
        <SliderWrapper
          width={width * state.items.length}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            transform: `translateX(${-(state.currentIndex * width)}px)`,
            transition: "transform ease-out 0.30s",
            width: width * state.items.length + "px"
          }}
          dir={dir}
        >
          {state.items.map((i, index) => {
            return (
              <Slide
                key={i.id}
                last={index === state.items.length - 1}
                index={index}
                item={i}
                dispatch={dispatch}
                snap={state.snap}
                width={300}
                slideItemRef={slideItemRef}
              />
            );
          })}
        </SliderWrapper>
      </SliderContainer>
    </div>
  );
};

function useWindowWidth(slideItemRef) {
  console.log(
    window.innerWidth,
    slideItemRef.current && slideItemRef.current.clientWidth
  );
  const [width, setWidth] = useState(305);

  useEffect(() => {
    console.log("above handleResize..", slideItemRef.current.clientWidth);
    const handleResize = () => setWidth(305);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return width;
}

function reducer(state, action) {
  switch (action.type) {
    case "NEXT":
      return {
        ...state,
        currentIndex: state.currentIndex + (1 % state.items.length)
      };
    case "PREV":
      return {
        ...state,
        currentIndex: state.currentIndex - (1 % state.items.length)
      };
    case "GOTO":
      return {
        ...state,
        currentIndex: action.index
      };
    case "RESET":
      return { currentIndex: 0, currentPosition: 0 };

    default:
      return state;
  }
}

const Slide = ({ slideItemRef, item, width }) => {
  return (
    <SliderItem ref={slideItemRef} width={width}>
      <div>{item.name}</div>
    </SliderItem>
  );
};

export default Slider;
