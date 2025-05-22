import Navbar from "@/components/navbar";
import Image from "next/image";
import React, { Fragment } from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Fragment>
      <Navbar showFullNav={false} />
      <div className="container py-12">{children}</div>
      <Image
        src="/1.png"
        alt="Nigerian cuisine"
        width={500}
        height={400}
        className="fixed inset-0 m-auto opacity-10 z-0 pointer-events-none w-[500px] h-auto object-contain"
      />
    </Fragment>
  );
};

export default layout;
