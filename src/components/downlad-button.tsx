"use client";
import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const DownladButton = () => {
  return (
    <Button variant={"ghost"} onClick={() => window.print()}>
      {" "}
      <Download />
    </Button>
  );
};

export default DownladButton;
