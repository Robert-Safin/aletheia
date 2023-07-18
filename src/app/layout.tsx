import "./globals.css";
import Provider from "./providers";
import styles from "./layout.module.css";
import Navbar from "../components/navbar/Navbar";
import { FC } from "react";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface Props {
  children: React.ReactNode;
  params : {

  }
}



const RootLayout:FC<Props> = (props) => {




console.log(props);




  return (
    <html lang="en">
      <Provider>
        <body className={styles.layout} id="__next">
          {props.children}
          <Navbar />
        </body>
      </Provider>
    </html>
  );
}


export default RootLayout;
