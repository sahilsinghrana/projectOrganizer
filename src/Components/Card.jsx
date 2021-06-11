import { memo } from "react";
const Card = ({ children, style }) => {
  return (
    <div className="card-dark" style={{ ...style }}>
      {children}
    </div>
  );
};

export default memo(Card);
