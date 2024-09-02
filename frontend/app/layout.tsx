import '@components/global.css';
import {josefin} from "@components/fonts";
import React from "react";

export const metadata = {
  title: 'Dumbledore Chat',
  description: 'A realtime chat developed in NextJS + NodeJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" className={josefin.className}>
      <body>{children}</body>
    </html>
  )
}
