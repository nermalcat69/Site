import "../App.css";
import { Levitate } from "../components/levitating";
// import { Steps } from "./components/steps";
import WindowSize from "../components/WindowSize";
import SomeComponent from "../components/SomeComponent";
import { Nav } from "../components/nav";

function Home() {
    return (
        <div className="mx-auto max-w-2xl py-16 px-6">
            <h2 className="ttl text-[#EAEAE7]">Arjun Aditya</h2>
            <p className="text-[#A6A49D] ttlb">Programmer / Designer</p>
            <div className="py-16">
                <div className="section">
                    <h3 className="ttl">Myself</h3>
                    <p className="txt font-thin">
                        I love trying out new things, whether they bring a financial outcome or not.
                    </p>
                    <p className="txt">
                        The point is, I enjoy almost everything from ui/ux design (despite being colorblind) to programming, marketing, writing, and finances.
                    </p>
                    <p className="txt">
                        I started my programming journey in 2015 when I wanted to create my own version of Minecraft because that 90-minute free trial used to ruin my mood. Spent Some time while investing as well.
                    </p>
                    <p className="txt">
                        Currently, I work as a full-stack developer at <a className="ext" href="https://zerops.io/" target="_blank">Zerops</a>, but I like to dabble in whatever comes my way.
                    </p>
                </div>
                <div className="section">
                    <h3 className="ttl">My Work Stack</h3>
                    <p className="txt font-thin">
                        Being blunt, I use almost everything. :3
                    </p>
                </div>
                <div className="section">
                    <h3 className="ttl">Socials</h3>
                    <p className="txt font-thin">
                        Checkout my <a href="https://x.com/zNermo" className="ext" target="_blank">Twitter</a>, <a href="https://github.com/nermalcat69" className="ext" target="_blank">Github</a>, <a href="https://unsplash.com/@arjunaditya" className="ext" target="_blank">Unsplash</a> and <a href="https://instagram.com/nermalcat69" className="ext" target="_blank">Instagram</a>.
                    </p>
                </div>
                <SomeComponent />
            </div>
            <Nav />
            <Levitate />
            <WindowSize />
        </div>
    );
}

export default Home;
