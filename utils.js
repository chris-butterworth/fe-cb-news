import moment from "moment";

export const timeSince = (isoTime) => {
  const date = new Date(isoTime);
  return moment(date).fromNow();
};
