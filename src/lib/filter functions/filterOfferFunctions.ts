import { PopulatedOffer, PopulatedVenue } from "@/app/home/page";

export const getTodaysOffers = (venues: PopulatedVenue[]): PopulatedOffer[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // set the time to the start of the day
  return venues.flatMap((venue) =>
    venue.offers!.filter((offer) => {
      const offerDate = new Date(offer.startDate);
      offerDate.setHours(0, 0, 0, 0); // set the time to the start of the day
      return +offerDate === +today;
    })
  );
};

export const getUpcomingOffers = (venues: PopulatedVenue[]): PopulatedOffer[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // set the time to the start of the day
  return venues.flatMap((venue) =>
    venue.offers!.filter((offer) => {
      const offerDate = new Date(offer.startDate);
      offerDate.setHours(0, 0, 0, 0); // set the time to the start of the day
      return offerDate > today; // changed from >= to >
    })
  );
};
