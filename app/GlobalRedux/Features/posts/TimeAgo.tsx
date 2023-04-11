import { parseISO, formatDistanceToNow } from "date-fns";

interface Date {
  timestamp: string;
}

function TimeAgo({ timestamp }: Date) {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
}

export default TimeAgo;
