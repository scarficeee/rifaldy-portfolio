import { Home } from "@/components/Home";
import { metadata as createMetadata } from "@/lib/metadata";
export const metadata = createMetadata("en");
export default function Page() {
  return <Home locale="en" />;
}
