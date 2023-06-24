
import styles from './page.module.css'

const registrationForm = async () => {


  async function handleSubmit() {

    "use server";
    // ...
  }



  return (
    <form action={handleSubmit} className={styles.form}>

      <label htmlFor="email">Email</label>
      <input type="email" name="email" placeholder="bob@things.com" />

      <label htmlFor="username">Username</label>
      <input type="username" name="username" placeholder="username" />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" />

      <label htmlFor="confirm password">Confirm Password</label>
      <input type="password" name="confirm password" />


      <button type="submit">Register</button>
    </form>

  );
};

export default registrationForm;
