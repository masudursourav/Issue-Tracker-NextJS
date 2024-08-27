import Skeleton from "react-loading-skeleton";

export default function NewIssuePageLoading() {
  return (
    <div>
      <Skeleton width={"75%"} />
      <Skeleton width={"75%"} />
      <Skeleton width={"50%"} />
      <Skeleton width={"50%"} />
      <Skeleton width={"50%"} />
    </div>
  );
}
