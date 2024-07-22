export default function searchBar() {
  return (
    <div class="flex-grow flex items-center justify-center">
      <input
        type="text"
        placeholder="SEARCH PROJECTS"
        class="p-2 rounded-full w-1/4 text-center bg-neutral-900 text-white placeholder-neutral-600 border border-neutral-600 focus:outline-none focus:border-sky-500"
      />
    </div>
  );
}
