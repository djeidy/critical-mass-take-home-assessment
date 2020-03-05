import React,{useState, useEffect} from 'react';

const Tabs = (props) => {

  const transitionTime = 300;
  const transitionStyle = `left ${transitionTime}ms, right ${transitionTime}ms`;
  const els = {};

  let root = null;

  const [sizes, setSizes] = useState({});

  const getSizes = () => {
    const rootBounds = root.getBoundingClientRect();

    const sizes = {};

    Object.keys(els).forEach((key) => {
      const el = els[key];
      const bounds = el.getBoundingClientRect();

      const left = bounds.left - rootBounds.left;
      const right = rootBounds.right - bounds.right;

      sizes[key] = {left, right};
    });

    setSizes(sizes);
    return sizes;
  };

  const getUnderlineStyle = () =>{
    if (!props.active) {
      return {left: '0', right: '100%'};
    }

    const size = sizes[props.active];
    return size ? {
      left: `${size.left}px`,
      right: `${size.right}px`,
      transition: transitionStyle,
    } : null
  };

  useEffect(()=>{
    getSizes()
  }, []);

  return (
    <div
      className="Tabs"
      ref={el => root = el}
    >
      {React.Children.map(props.children, (child, i) => {
        let className = `Tabs__Tab`;
        if (child.key === props.active) {
          className = `${className} Tabs__Tab--active`;
        }
        return (
          <div
            className={className}
            onClick={() => {
              props.onChange(child.key);
            }}
            ref={el => els[child.key] = el}
          >
            {child}
          </div>
        );
      })}
      <div
        className="Tabs__Underline"
        style={getUnderlineStyle()}
      />
      <div className="HorizontalLine"/>
    </div>
  );
};

export default Tabs;
