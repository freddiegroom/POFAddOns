import React, { FC, Children, CSSProperties, lazy } from "react";
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

interface BLT_Block {
  block: "Features" | "Title" | "Subtitle";
  id?: number;
}

interface BLT_HStack {
  columnBlocks: BlockLayoutType[];
}

type BlockLayoutType = BLT_Block | BLT_HStack;

const layout: BlockLayoutType[] = [
  {
    columnBlocks: [
      {
        block: "Title",
        id: 0,
      },
      {
        block: "Title",
        id: 1,
      },
      {
        block: "Features",
      },
    ],
  },
];

const dataElements: dataElementsTypes[] = [
  {
    title: "Complete Wifi",
    overrideStyle: { fontWeight: "bold" },
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
    title:
      "A Strong Wi-Fi signal in every room of your home, backed by our Complete Wi-Fi Guarantee",
    overrideStyle: { fontWeight: "bold" },
  },
];

// const getDataForLayoutBlock=  (layoutBlock : BLT_Block, dataEls: dataElementsTypes[])  => {
//   let isInstanceFunction
//   switch(layoutBlock.block ) {
//     case 'Features': {isInstanceFunction = instanceOfFeatureBlock}
//     default: {}
//   }
//
//   let count = layoutBlock.id || 0
//
//   const blockData = dataEls.find(de => {
//     if (isInstanceFunction(de)) {
//       if (count > 0) {
//         count = count - 1
//       } else {
//         return true
//       }
//     }
//     return false
//   })
//
//   return blockData
// }

const renderElementByBlockType = (element: dataElementsTypes) => {
  if (instanceOfFeatureBlock(element)) {
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
