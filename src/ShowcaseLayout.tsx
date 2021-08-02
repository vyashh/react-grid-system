import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// ShowcaseLayout.propTypes = {
//   onLayoutChange: PropTypes.func.isRequired
// };

// ShowcaseLayout.defaultProps = {
//   className: "layout",
//   rowHeight: 30,
//   onLayoutChange: function () {},
//   cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
//   initialLayout: generateLayout()
// };

function generateLayout() {
  return _.map(_.range(0, 25), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

interface Props {
  onLayoutChange: any;
  className: string;
  cols: any;
}

const ShowcaseLayout: React.FC<Props> = ({ onLayoutChange }) => {
  // export default class ShowcaseLayout extends React.Component {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const [mounted, setMounted] = useState<boolean>(false);
  const [compactType, setCompactType] = useState<any>("verticle");
  const [initialLayout, setInitialLayout] = useState<any>(null);
  const [layouts, setLayouts] = useState<any>({ lg: initialLayout });
  const [cols, setCols] = useState<any>({
    lg: 12,
    md: 10,
    sm: 6,
    xs: 4,
    xxs: 2
  });

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       currentBreakpoint: "lg",
  //       compactType: "vertical",
  //       mounted: false,
  //       layouts: { lg: props.initialLayout }
  //     };

  //   this.onBreakpointChange = this.onBreakpointChange.bind(this);
  //   this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
  //   this.onLayoutChange = this.onLayoutChange.bind(this);
  //   this.onNewLayout = this.onNewLayout.bind(this);
  // }

  useEffect(() => {
    setMounted(true);
    setInitialLayout(generateLayout());
  }, [initialLayout]);

  const generateDOM = () => {
    return _.map(layouts.lg, function (l, i) {
      return (
        <div key={i} className={l.static ? "static" : ""}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  };

  const onBreakpointChange = (breakpoint: any) => {
    setCurrentBreakpoint(breakpoint);
  };

  const layoutChangeHandler = (layout, layouts) => {
    onLayoutChange(layout);
  };

  const onNewLayout = () => {
    setLayouts({ lg: generateLayout() });
  };

  const onCompactTypeChange = () => {
    const oldCompactType = compactType;
    const newCompactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    setCompactType(newCompactType);
  };

  return (
    <div>
      <div>
        Current Breakpoint: {currentBreakpoint} ({cols[currentBreakpoint]}{" "}
        columns)
      </div>
      <div>Compaction type: {_.capitalize(compactType) || "No Compaction"}</div>
      <ResponsiveReactGridLayout
        // {...this.props}
        cols={cols}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={layoutChangeHandler}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default ShowcaseLayout;
