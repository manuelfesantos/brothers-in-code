import styles from "./component.module.css";
import Link from "next/link";
export default function Header() {
  return (
    <div className={styles.header}>
      <ul className={styles.navBar}>
        <Link href={"/"}>
          <li>Home</li>
        </Link>
        <Link href={"/products"}>
          <li>Products</li>
        </Link>
        <Link href={"/login"}>
          <li>Login</li>
        </Link>
        <Link href={"/cart"}>
          <li>Cart</li>
        </Link>
      </ul>
    </div>
  );
}
