import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import BookButton from "./BookButton";
import Heading from "../common/Heading";

export default function Header({ data, logo, currentLangId, user }) {
  if (!data) return null;

  return (
    <div className="w-full bg-white py-3">
      <div className="max-w-full mx-auto px-4">

        {/* Main Row */}
        <div className="flex items-center justify-between">

          {/* ===== LEFT SECTION ===== */}
          <div className="flex items-center gap-4 flex-1">

            {/* Logo → Hide below 1024px */}
            <div className="hidden lg:block">
              <Logo logo={logo} />
            </div>

            {/* Search */}
            <div className="w-full max-w-xs">
              <SearchBar />
            </div>
          </div>

          {/* ===== CENTER TITLE ===== */}
          <div className="hidden md:flex flex-1 justify-center">
            <Heading
              as="h1"
              split
              shadow
              color="text-primary"
              className="text-2xl lg:text-4xl font-bold text-center leading-tight"
            >
              Redwoods Tours <br />
              & Adventures
            </Heading>
          </div>

          {/* ===== RIGHT SECTION ===== */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <CartIcon />
            <BookButton text={data?.book_now_button_text} />
          </div>

        </div>
      </div>
    </div>
  );
}
