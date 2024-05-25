import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center mt-4 py-4">
      <p>
        Made by me,{" "}
        <Link
          href={"https://dipankarpaul.vercel.app/"}
          className="hover:underline hover:text-blue-700"
          target="_blank"
        >
          {" "}
          Dipankar Paul
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
