import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center mt-4 py-4">
      <p>
        Made by me,{" "}
        <Link href={"/"} className="hover:underline hover:text-blue-700">
          {" "}
          Dipankar Paul
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
