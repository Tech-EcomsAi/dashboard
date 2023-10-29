import React from "react";
import styles from "@templatesCSS/homePage/homePage.module.scss";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import CraftBuilder from "@template/craftBuilder";

const HomePage = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.homePageContainer}>
      <CraftBuilder />
    </div>
  );
}
export default HomePage;
