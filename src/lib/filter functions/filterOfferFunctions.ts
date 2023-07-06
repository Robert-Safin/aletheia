import { PopulatedVenue } from "@/app/home/page"


export const getTodaysOffers = (venuesNearUser:PopulatedVenue[]) => {
  // Current date
  const today = new Date();
  const days = ['onSunday', 'onMonday', 'onTuesday', 'onWednesday', 'onThursday', 'onFriday', 'onSaturday'];
  const todayDayOfWeek = days[today.getDay()];

  // Offers today (valid)
  const todaysOffers = venuesNearUser.flatMap((venue) => {
    return venue.offers!.filter((offer) => {
      if(offer.isRecurring) {
        //@ts-ignore
        return offer[todayDayOfWeek] === true && new Date(offer.endDate) > today;
      } else {
        //@ts-ignore
        return offer[todayDayOfWeek] === true && new Date(offer.startDate).setHours(23, 59, 59, 999) >= today;
      }
    });
  });

  return todaysOffers;
}

export const getUpcomingOffers =(venuesNearUser:PopulatedVenue[]) => {
  // Current date
  const today = new Date();
  const days = ['onSunday', 'onMonday', 'onTuesday', 'onWednesday', 'onThursday', 'onFriday', 'onSaturday'];
  const todayDayOfWeek = days[today.getDay()];

    // Upcoming offers (valid)
    const upcomingOffers = venuesNearUser.flatMap((venue) => {
      return venue.offers!.filter((offer) => {
        if(offer.isRecurring) {
          //@ts-ignore
          return offer[todayDayOfWeek] === false && new Date(offer.endDate) > today;
        } else {
          //@ts-ignore
          return offer[todayDayOfWeek] === false && new Date(offer.startDate) > today;
        }
      });
    });

    return upcomingOffers;

}
