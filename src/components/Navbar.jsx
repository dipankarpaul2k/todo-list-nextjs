import Link from "next/link";

const Navbar = () => {
  return (
    <header className="py-4 px-2 sm:px-4 border-b border-b-gray-400">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold sm:text-2xl sm:font-bold"
        >
          TodoList
        </Link>
        <Link href={`/completed`} className="btn_filled">
          Completed
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
