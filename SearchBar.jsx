import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center border border-primary rounded-full px-4 py-3 w-full md:w-64">
      <Search size={18} className="text-primary" />
      <input
        type="text"
        placeholder="Search"
        className="ml-2 outline-none bg-transparent w-full text-sm md:text-base"
      />
    </div>
  );
}
