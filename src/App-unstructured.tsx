import React, { FC, Children, CSSProperties } from "react";
import "./App.css";

interface dataElementsTypes {
  text: string;
  overrideStyle?: CSSProperties;
  block?: string;
}

const dataElements: dataElementsTypes[] = [
  {
    text: "this is some text",
    overrideStyle: { color: "grey" },
  },
  {
    block: "bullet",
    text: "this is some more text",
    overrideStyle: { color: "grey", backgroundColor: "red", fontSize: "1.5em" },
  },
  {
    block: "bullet",
    text: "this is some more text 2",
  },
];

console.log(dataElements[0].overrideStyle);

const App = () => {
  return (
    <div className="App">
      <p>testing app</p>
      {dataElements.map((element) => {
        if (element.block) {
          if (element.block === "bullet") {
            console.log(element.overrideStyle);
            return (
              <div style={element.overrideStyle}>
                <li style={element.overrideStyle}>{element.text}</li>
              </div>
            );
          }
        }
        return <p style={element.overrideStyle}>{element.text}</p>;
      })}
    </div>
  );
};

export default App;
