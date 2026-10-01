import { Root } from "@/components/Root";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Root locale="en">{children}</Root>;
}
