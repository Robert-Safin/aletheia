
import Container from "../../components/containers/Container";
import MainHeader from "../../components/headers/MainHeader";
import SubHeader from "../../components/headers/SubHeader";
import SearchBar from "../../components/searchBar/SearchBar";
import styles from "./page.module.css";
import { BiWalk } from "react-icons/bi";
import { MdOutlineLocalOffer, MdLocalOffer } from "react-icons/md";
import { FC} from "react";
import VenueCardContainer from "../../components/homePage/CardContainer";
import { AiFillCalendar, AiOutlineCalendar } from "react-icons/ai";




const HomePage: FC = (props) => {


  return (
    <Container>
      <MainHeader title="Welcome Home" />
      <SearchBar />

      <div className={styles.categoryHeader}>
        <MdLocalOffer className={styles.categoryIcon} />
        <SubHeader title="Offers happening now" />
      </div>

      <div className={styles.categoryHeader}>
        <MdOutlineLocalOffer className={styles.categoryIcon} />
        <SubHeader title="Upcoming Offers" />
      </div>

      <div className={styles.categoryHeader}>
        <AiFillCalendar className={styles.categoryIcon} />
        <SubHeader title="Events happening now" />
      </div>

      <div className={styles.categoryHeader}>
        <AiOutlineCalendar className={styles.categoryIcon} />
        <SubHeader title="Upcoming Event" />
      </div>

      <div className={styles.categoryHeader}>
        <BiWalk className={styles.categoryIcon} />
        <SubHeader title="Places Near You" />
      </div>

      <VenueCardContainer/>

    </Container>
  );
};

export default HomePage;
