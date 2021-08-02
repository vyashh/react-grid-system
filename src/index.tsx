import React, { useState } from "react";
import ReactDOM from "react-dom";
import ShowcaseLayout from "./ShowcaseLayout";

const ExampleLayout: React.FC = () => {
  const [layout, setLayout] = useState<any>(null);

  const onLayoutChange = (layout: any) => {
    setLayout({ layout: layout });
  };

  // const stringifyLayout = () => {
  //   return layout.map(function (l) {
  //     return (
  //       <div className="layoutItem" key={l.i}>
  //         <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
  //       </div>
  //     );
  //   });
  // };

  return (
    <div>
      <ShowcaseLayout onLayoutChange={onLayoutChange} />
    </div>
  );
};

const contentDiv = document.getElementById("root");
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(ExampleLayout, gridProps), contentDiv);
export default ExampleLayout;
