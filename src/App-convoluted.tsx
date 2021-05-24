import React, { FC, Children, CSSProperties } from "react";
import { JsxElement } from "typescript";
import "./App.css";

type FeatureBlock = {
  features: string[];
  overrideStyle?: CSSProperties;
};

type TitleBlock = {
  title: string;
  overrideStyle?: CSSProperties;
};

type SubtitleBlock = {
  subtitle: string;
  overrideStyle?: CSSProperties;
};

interface HStackBlock {
  childBlocks: dataElementsTypes[];
}

type dataElementsTypes =
  | FeatureBlock
  | TitleBlock
  | SubtitleBlock
  | HStackBlock;

function instanceOfFeatureBlock(obj: dataElementsTypes): obj is FeatureBlock {
  return "features" in obj;
}

function instanceOfTitleBlock(obj: dataElementsTypes): obj is TitleBlock {
  return "title" in obj;
}

// interface dataElementsTypes {
//   text?: string;
//   block?: string;
//   overrideStyle?: CSSProperties;
//   features?: string[];
// }

const dataElements: dataElementsTypes[] = [
  {
    childBlocks: [
      {
        features: ["a", "b", "c"],
      },
      {
        title: "Cool things",
      },
    ],
  },
  {
    overrideStyle: { fontSize: "12px" },
    features: [
      "The Wi-Fi disc talks to your Smart Hub 2 create a seamless, powerful network",
      "You should be able to stream HD content anywhere in your home",
      "A 4+ bedroom house could see Wi-Fi speeds increase by up to 25% with just 1 Wi-Fi Disc",
      "We guarantee Wi-Fi speeds 10x faster than Sky, as long as your Stay Fast Guarantee is over 30Mb",
    ],
  },
  {
    title: "Complete Wifi",
    overrideStyle: { fontWeight: "bold" },
  },
  {
    title:
      "A Strong Wi-Fi signal in every room of your home, backed by our Complete Wi-Fi Guarantee",
    overrideStyle: { fontWeight: "bold" },
  },
];

const renderElementByBlockType = (element: dataElementsTypes) => {
  if (instanceOfFeatureBlock(element)) {
    // return <FeatureBlock data={element} />
    return (
      <ul>
        {element.features.map((feature) => {
          return <li>{feature}</li>;
        })}
      </ul>
    );
  }

  if (instanceOfTitleBlock(element)) {
    return <p style={element.overrideStyle}>{element.title}</p>;
  }

  // assume it's the hstack
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {(element as HStackBlock).childBlocks.map((el) => {
        return <div>{renderElementByBlockType(el)}</div>;
      })}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      {dataElements.map((element) => {
        return renderElementByBlockType(element);
      })}
    </div>
  );
};

export default App;
