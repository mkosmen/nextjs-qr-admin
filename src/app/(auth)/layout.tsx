import { ReactElement } from "react";

import "@/app/globals.scss";

type Props = {
  children: ReactElement;
};

export default async function RootLayout({ children }: Props) {
  return <div>{children}</div>;
}
