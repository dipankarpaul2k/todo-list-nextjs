import Link from "next/link";
import { IconSquareRoundedCheck } from "@tabler/icons-react";

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
          <span className="max-sm:hidden">Completed</span>
          <IconSquareRoundedCheck stroke={2} className="sm:hidden" />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
