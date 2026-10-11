"use client"

import { DsTypography,DsButton } from "@crypto/ui";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-6 font-sans dark:bg-black">
      <DsTypography as="h1" color="danger" >
        Crypto Vision
      </DsTypography>
      <DsTypography variant="body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sint!
      </DsTypography>
      <DsTypography as="span" variant="caption">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sint!
      </DsTypography>
      <DsButton color="blue" onClick={()=>{alert("hi")}}>click me</DsButton>
      
      
    </main>
  );
}
