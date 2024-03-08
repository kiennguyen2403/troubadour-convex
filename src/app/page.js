import Image from "next/image";
import styles from "./page.module.css";
import { UploadMediaButton } from "./UploadMediaButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <UploadMediaButton />
    </main>
  );
}
