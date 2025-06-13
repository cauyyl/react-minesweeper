"use client";
import React, { createContext, useState } from "react";

export const ThemeContext = createContext("light");

const DefTheme = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  function changeMode() {
    console.log("click change mode");
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <button onClick={changeMode}>切换模式：{theme}</button>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default DefTheme;
