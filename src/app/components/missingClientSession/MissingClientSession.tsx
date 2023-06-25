import { FC } from "react";
import LoginButton from "../authButtons/LogInButton";
import RegisterButton from "../authButtons/RegisterButton";


const MissingClientSession:FC = () => {
  return (
    <div>
      <LoginButton/>
      <RegisterButton/>
    </div>
  );
}


export default MissingClientSession;
