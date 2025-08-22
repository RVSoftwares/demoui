import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Dashboard from "./dashboard/page"; // import dashboard page component
export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Dashboard/>
    </div>
  );
}
