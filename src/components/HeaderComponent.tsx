const HeaderComponent = () => {
  return (
    <header className="bg-gray-800 text-white p-1 px-36">
      <h1 className=" ">My Application</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
export default HeaderComponent;