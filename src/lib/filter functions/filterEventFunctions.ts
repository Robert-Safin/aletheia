import { PopulatedVenue } from "@/app/home/page";

export const getUpcomingEvents = (venuesNearUser:PopulatedVenue[]) => {
  // Current date
  const today = new Date();
  const days = ['onSunday', 'onMonday', 'onTuesday', 'onWednesday', 'onThursday', 'onFriday', 'onSaturday'];
  const todayDayOfWeek = days[today.getDay()];

  // Upcoming events (valid)
  const upcomingEvents = venuesNearUser.flatMap((venue) => {
    return venue.events!.filter((event) => {
      if(event.isRecurring) {
        //@ts-ignore
        return event[todayDayOfWeek] === false && new Date(event.endDate) > today;
      } else {
        //@ts-ignore
        return event[todayDayOfWeek] === false && new Date(event.startDate) > today;
      }
    });
  });

  return upcomingEvents;
};

export const getTodaysEvents = (venuesNearUser:PopulatedVenue[]) => {
  // Current date
  const today = new Date();
  const days = ['onSunday', 'onMonday', 'onTuesday', 'onWednesday', 'onThursday', 'onFriday', 'onSaturday'];
  const todayDayOfWeek = days[today.getDay()];

  // Events today (valid)
  const todaysEvents = venuesNearUser.flatMap((venue) => {
    return venue.events!.filter((event) => {
      if(event.isRecurring) {
        //@ts-ignore
        return event[todayDayOfWeek] === true && new Date(event.endDate) > today;
      } else {
        //@ts-ignore
        return event[todayDayOfWeek] === true && new Date(event.startDate).setHours(23, 59, 59, 999) >= today;
      }
    });
  });

  return todaysEvents;
};
