import WindowSize from "~/components/WindowSize";
import Content from "~/components/content";
import { DarkMode } from "~/components/DarkMode";
export default function App() {
  return (
    <main>
      <div className=" flex flex-col justify-center mx-auto">
        <Content />  
      </div>
        <WindowSize />
    </main>
  );
}
