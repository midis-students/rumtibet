import { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  return <main>{children}</main>;
}
