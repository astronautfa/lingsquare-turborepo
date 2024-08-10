import React from "react";

const Book = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        outline: "none",
        flexShrink: "0",
        width: "250px",
        perspective: "1000px",
        gap: "0px",
        transition: "all 500ms ease 0s",
        willChange: "auto",
        transform: "translateX(0px)",
        marginLeft: "-6.69873px",
        marginRight: "-168.713px",
      }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexShrink: "0",
          width: "50px",
          height: "250px",
          transformOrigin: "right center",
          backgroundColor: "rgb(219, 219, 219)",
          color: "rgb(22, 25, 31)",
          transform: "rotateY(-30deg)",
          transition: "all 500ms ease 0s",
          willChange: "auto",
          filter: "brightness(0.8) contrast(2)",
          userSelect: "none",
        }}
      >
        <span
          style={{
            pointerEvents: "none",
            position: "fixed",
            zIndex: "50",
            height: "250px",
            width: "100%",
            opacity: "0.4",
            filter: "url(&quot;#paper&quot;)",
            userSelect: "none",
          }}
        ></span>
        <h2
          style={{
            fontFamily:
              '"Inter-SemiBold", "Inter", "Inter Placeholder", sans-serif',
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "600",
            letterSpacing: "-0.03em",
            lineHeight: "1em",
            writingMode: "vertical-rl",
            marginTop: "12px",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxHeight: "225px",
          }}
        >
          The Creative Act
        </h2>
      </div>
      <div
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          flexShrink: "0",
          overflow: "hidden",
          transformOrigin: "left center",
          transform: "rotateY(81deg)",
          transition: "all 500ms ease 0s",
          willChange: "auto",
          filter: "brightness(0.8) contrast(2)",
          userSelect: "none",
        }}
      >
        <span
          style={{
            pointerEvents: "none",
            position: "fixed",
            zIndex: "50",
            height: "250px",
            width: "200px",
            opacity: "0.4",
            filter: "url(&quot;#paper&quot;)",
            userSelect: "none",
          }}
        ></span>
        <span
          style={{
            pointerEvents: "none",
            userSelect: "none",
            position: "absolute",
            top: "0px",
            left: "0px",
            zIndex: "50",
            height: "250px",
            width: "200px",
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.25) 4px, rgba(255, 255, 255, 0.25) 6px, transparent 7px, transparent 9px, rgba(255, 255, 255, 0.25) 9px, transparent 12px)",
          }}
        ></span>
        <img
          alt="The Creative Act Cover"
          src="/cover.webp"
          style={{
            transition: "all 500ms ease 0s",
            willChange: "auto",
            width: "200px",
            height: "250px",
            maxHeight: "100%",
            userSelect: "none",
          }}
        ></img>
      </div>
    </div>
  );
};

export default Book;
