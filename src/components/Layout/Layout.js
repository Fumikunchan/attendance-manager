import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
