import WindowSize from "~/components/WindowSize";
// import Ip from "~/components/Ip";
import { DarkMode } from "~/components/DarkMode";

export default function Content() {
    return (
        <div className="flex flex-col justify-center">
                <img src="mona-by-github.gif" className="gif" width={50} height={50} draggable="false" alt="" />
                <DarkMode />
        </div>
    );
}
