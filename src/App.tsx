import "./App.css";
// import { Levitate } from "./components/levitating";
import WindowSize from "./components/WindowSize";
import SomeComponent from "./components/SomeComponent";
import LovedImages from "./components/LovedImages";

function App() {
    return (
        <>
            {/* <div
                className="absolute left-1/2 -translate-x-1/2 grayscale z-10 top-0 h-40 w-screen max-w-[1920px]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath stroke='%234B5EFB' stroke-width='1' d='M15 10l15 15M10 15l15-15M35 10l15 15M40 15l15-15M15 30l15 15M10 35l15-15M35 30l15 15M40 35l15-15M15 50l15 15M10 55l15-15M35 50l15 15M40 55l15-15'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px',
                    WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)',
                    mask: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)'
                }}
            /> */}
            <div className="mx-auto max-w-2xl py-16 px-6 relative">
                <h2 className="text-2xl font-medium text-[#1a1a1a]">Arjun Aditya</h2>
                <p className="text-[#a7a7a7] text-sm">Programmer / Designer</p>
                <div className="py-6">
                    <div className="section">
                        <h3 className="ttl">Myself</h3>
                        <p className="txt">
                            The point is, I enjoy almost everything from ui/ux design (despite being colorblind) to programming, marketing, writing, and finances.
                        </p>
                        <p className="txt">
                            I started my programming journey in 2015 when I wanted to create my own version of Minecraft because that 90-minute free trial used to get on my nerves. Spent Some time in financial markets as well.
                        </p>
                        <p className="txt">
                            Currently, I work as a full-stack developer at <a href="https://zerops.io/" target="_blank">Zerops</a>, but I like to dabble in whatever comes my way.
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
                            Checkout my <a href="https://x.com/nermalcat69" target="_blank">Twitter</a>, <a href="https://github.com/nermalcat69" target="_blank">Github</a>, <a href="https://unsplash.com/@arjunaditya" target="_blank">Unsplash</a>, <a href="https://read.cv/nermal" target="_blank">Read.cv</a> and <a href="https://instagram.com/nermalcat69" target="_blank">Instagram</a>.
                        </p>
                    </div>
                    <SomeComponent />
                    <LovedImages />

                </div>
                {/* <Levitate /> */}
                <WindowSize />
            </div>
        </>
    );
}

export default App;
