import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IssueActions() {
  return (
    <div className="mb-5">
      <Link href={"/issue/new"}>
        <Button>New Issue</Button>
      </Link>
    </div>
  );
}
