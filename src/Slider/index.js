import React, { useState, useEffect, useReducer, useRef } from "react";
import { SliderItem, SliderContainer, SliderWrapper } from "./styles";
import { InView } from "react-intersection-observer";
import Swipe from "react-easy-swipe";

const Slider = ({ dir = "ltr", h, w, margin }) => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const width = useWindowWidth(w + margin);
  // sliderRef.scrollLeft = 100;
  // console.log(sliderRef);
  const scrollToLeft = () => {
    // console.log(slideItemRef.current.clientWidth);
    dir === "rtl"
      ? (sliderRef.current.scrollLeft = state.items.length * width)
      : (sliderRef.current.scrollLeft = 0);
  };
  const goToNext = () => {
    console.log("go to next", state.currentIndex);

    dir === "rtl"
      ? (sliderRef.current.scrollLeft =
          (state.items.length - state.currentIndex - 1) * width)
      : (sliderRef.current.scrollRight = width);
  };
  const goToPrev = () => {
    console.log("go to prev", state.currentIndex);

    dir === "rtl"
      ? state.currentIndex <= 1
        ? null
        : (sliderRef.current.scrollRight = width)
      : (sliderRef.current.scrollLeft = width);
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
        height={`${h}px`}
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
              <InView
                onChange={(inView, entry) => {
                  if (inView && entry.intersectionRatio >= 1) {
                    state.currentIndex = index + 1;
                  }
                }}
                key={i.id}
              >
                <Swipe
                  onSwipeLeft={() => goToPrev()}
                  onSwipeRight={() => goToNext()}
                >
                  <Slide
                    key={i.id}
                    last={index === state.items.length - 1}
                    index={index}
                    item={i}
                    dispatch={dispatch}
                    snap={state.snap}
                    width={w}
                  />
                </Swipe>
              </InView>
            );
          })}
        </SliderWrapper>
      </SliderContainer>
    </div>
  );
};

function useWindowWidth(initialWidth) {
  // console.log(
  //   window.innerWidth,
  //   slideItemRef.current && slideItemRef.current.clientWidth
  // );
  const [width, setWidth] = useState(initialWidth);

  useEffect(() => {
    // console.log("above handleResize..", slideItemRef.current.clientWidth);
    const handleResize = () => setWidth(initialWidth);

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

const Slide = ({ item, width }) => {
  return (
    <SliderItem width={width}>
      <div>{item.name}</div>
    </SliderItem>
  );
};

export default Slider;
