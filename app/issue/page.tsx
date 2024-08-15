import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <Link href={"/issue/new"}>
        <Button>New Issue</Button>
      </Link>
    </div>
  );
}
