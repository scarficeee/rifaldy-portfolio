import { Root } from "@/components/Root";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Root locale="id">{children}</Root>;
}
