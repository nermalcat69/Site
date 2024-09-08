import { Server } from "./Server";

export default function SomeComponent() {
    return (
        <div className="flex flex-col justify-center">
                <img src="mona-by-github.gif" className="gif" width={50} height={50} draggable="false" alt="" />
            <Server />
        </div>
    );
}
