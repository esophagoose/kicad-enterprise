export default function Layout({ children, title, navItems }: Props) {
  return (
    <div class="bg-zinc-950 text-white min-h-screen flex">
      <nav class="min-h-screen w-1/6 flex flex-col divide-y divide-zinc-800">
        <header class="px-4 py-6">
          <a href="/">
            <h1 class="text-2xl">{title}</h1>
          </a>
        </header>
        <ul class="flex flex-col flex-grow">
          {navItems}
        </ul>
        <footer class="font-mono text-sm text-gray-300 pb-3">
          <div class="p-4">
            <a href="https://github.com/esophagoose/kicad-enterprise">
              kicad-enterprise: v0.0.1
            </a>
          </div>
        </footer>
      </nav>
      <main class="flex-grow mt-3 w-full h-screen">
        <div class="bg-zinc-900 rounded-tl-md p-4 w-full h-full border border-zinc-800">
          {children}
        </div>
      </main>
    </div>
  );
}
