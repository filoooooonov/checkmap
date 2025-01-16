import MapLoader from "./components/MapLoader";

export default async function Page() {
  return (
    <>
      <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        <MapLoader posix={[60.1699, 24.9384]} />
      </div>
    </>
  );
}
