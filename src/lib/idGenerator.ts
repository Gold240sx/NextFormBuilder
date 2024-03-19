import React from "react";

const IdGenerator = () => {
  return Math.floor(Math.random() * 1001).toString();
};

export default IdGenerator;
