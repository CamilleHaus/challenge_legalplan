import Image from "next/image";
import styles from "../styles/header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__logos}>
        <Image src={"/logomark.svg"} width={33} height={33} alt="Logomark" />
        <Image src={"/logotype.svg"} width={106} height={15} alt="Logotype" />
      </div>
      <p className={styles.header__welcome}>Bem-vindo de volta, Marcus</p>
      <span className={styles.header__date}>
        Segunda, 01 de Dezembro de 2025
      </span>
    </div>
  );
};

export default Header;
