import WindowSize from "~/components/WindowSize";
import Content from "~/components/content";
import { DarkMode } from "~/components/DarkMode";
export default function App() {
  return (
    <main>
      <div className="">
        <Content />  
      </div>
        <WindowSize />
    </main>
  );
}
