import moment from "moment";

export const formatDate = (
  date: string | Date,
  formatPrev = "YYYY-MM-DD",
  newFormat = "DD/MM/YYYY"
) => moment(date, formatPrev).format(newFormat);

export const convertFileImage = (uri: string) => {
  let filename = uri.split("/").pop()!;

  let match = /\.(\w+)$/.exec(filename);

  let type = match ? `image/${match[1]}` : `image`;

  return { filename, type };
};
