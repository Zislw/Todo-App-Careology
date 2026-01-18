export const formatDateForMobile = (date: Date): string => {
  const today = new Date();
  const taskDate = new Date(date);

  today.setHours(0, 0, 0, 0);
  taskDate.setHours(0, 0, 0, 0);

  const isToday = today.getTime() === taskDate.getTime();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[taskDate.getMonth()];
  const day = taskDate.getDate();

  if (isToday) {
    return `Today - ${month} ${day}`;
  }

  return `${month} ${day}`;
};
