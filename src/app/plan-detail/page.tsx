import React, { Suspense } from "react";
import Suspenses from "./Suspense";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <Suspenses />
    </Suspense>
  );
};

export default Page;
