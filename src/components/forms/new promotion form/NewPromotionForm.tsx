
import { FC,} from "react";

import "react-datepicker/dist/react-datepicker.css";

import FormSelection from "./FormSelection";
import { OneTimeOfferForm } from "./one time type/OneTimeOffer";

interface Props {
  venueId: string;
}
const submitRecurringOfferForm = async (form:OneTimeOfferForm) => {
  "use server"
  console.log(form);


}

const NewPromotionForm:FC<Props> = async (props) => {



  return (
    <>
      <FormSelection submitRecurringOfferForm={submitRecurringOfferForm}/>
    </>
  );
};

export default NewPromotionForm;
