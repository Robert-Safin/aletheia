import Container from "../../components/containers/Container";
import MainHeader from "../../components/headers/MainHeader";
import SubHeader from "../../components/headers/SubHeader";
import SearchBar from "../../components/searchBar/SearchBar";
import styles from "./page.module.css";
import { BiWalk } from "react-icons/bi";
import { MdOutlineLocalOffer, MdLocalOffer } from "react-icons/md";
import { FC } from "react";
import { AiFillCalendar, AiOutlineCalendar } from "react-icons/ai";
import ClosestVenueCardContainer from "../../components/homePage/ClosestCardContainer";

const HomePage: FC = (props) => {
  return (
    <Container>
      <MainHeader title="Welcome Home" />
      <SearchBar />

      <div className={styles.categoryHeader}>
        <MdOutlineLocalOffer className={styles.categoryIcon} />
        <MainHeader title="Offers Today" />
      </div>

      <div className={styles.categoryHeader}>
        <MdLocalOffer className={styles.categoryIcon} />
        <MainHeader title="Upcoming Offers" />
      </div>

      <div className={styles.categoryHeader}>
        <AiOutlineCalendar className={styles.categoryIcon} />
        <MainHeader title="Events Today" />
      </div>

      <div className={styles.categoryHeader}>
        <AiFillCalendar className={styles.categoryIcon} />
        <MainHeader title="Upcoming Event" />
      </div>

      <div className={styles.group}>
        <div className={styles.categoryHeader}>
          <BiWalk className={styles.categoryIcon} />
          <MainHeader title="Places Near You" />
        </div>
        <ClosestVenueCardContainer />
      </div>
    </Container>
  );
};

export default HomePage;
