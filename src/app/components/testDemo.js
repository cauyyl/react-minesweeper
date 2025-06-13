"use client";
import React, { useEffect, useRef } from "react";

const TestDemo = () => {
  const mounted = useRef(false);
  const isRunning = useRef(true);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    test();
  }, []);

  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("return useEffect ");
    };
  }, [count]);

  function test() {
    console.log("test");
  }

  return (
    <div>
      <h4
        style={{
          marginTop: 20,
        }}
      >
        本地调试页面
      </h4>
      <p
        onClick={() => {
          setCount(count + 1);
        }}
      >
        update count
      </p>
    </div>
  );
};

export default TestDemo;
