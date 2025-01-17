const formatDate = (date: Date | string) => {
  const formattedDate = new Date(date).toLocaleDateString();
  // console.log("formattedDate :>> ", formattedDate);
  return formattedDate;
};

const formatDateAndTime = (dateAndTime: Date | string) => {
  const date = new Date(dateAndTime).toLocaleDateString();
  const time = new Date(dateAndTime).toLocaleTimeString();
  return (
    <>
      {date}, {time}
    </>
  );
};

export { formatDate, formatDateAndTime };
