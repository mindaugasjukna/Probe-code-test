import Link from "next/link";
import { AuthContext } from "../Layout/Layout";
import { useContext } from "react";

const Header: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {!currentUser ? (
        <nav>
          <p>Logo</p>
          <Link href="/">
            <button>Home</button>
          </Link>
          <Link href="/signup">
            <button>Signup</button>
          </Link>
        </nav>
      ) : (
        <nav>
          <p>Logo</p>
          <p>Welcome {currentUser?.name}</p>
          <Link href="/">
            <button>Home</button>
          </Link>
          <Link href="/profile">
            <button>Profile</button>
          </Link>
        </nav>
      )}
    </>
  );
};

export default Header;
