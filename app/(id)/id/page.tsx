import { Home } from "@/components/Home";
import { metadata as createMetadata } from "@/lib/metadata";
export const metadata = createMetadata("id");
export default function Page() {
  return <Home locale="id" />;
}
