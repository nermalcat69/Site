import WindowSize from "~/components/WindowSize";
import BatteryStatus from "~/components/Battery";
import Ip from "~/components/Ip";

export default function App() {
  return (
    <>
      <main>
        {/* <h2 className='text-2xl font-medium '>Nermal</h2> */}
        <div>
          <img src="mona-by-github.gif" className="" width={50} height={50} draggable="false" alt="" />
        </div>
        {/* <Ip /> */}
        <BatteryStatus />
        <WindowSize />
      </main>
    </>
  );
}
