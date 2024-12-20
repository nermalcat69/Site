import "./App.css";
// import { Levitate } from "./components/levitating";
import WindowSize from "./components/WindowSize";
import SomeComponent from "./components/SomeComponent";
import LovedImages from "./components/LovedImages";
import { useState, useEffect } from 'react';
import ServerMetrics from "./components/ServerMetrics";

function App() {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = '/rickyy.gif';
        img.onload = () => {
            setIsImageLoaded(true);
        };
    }, []);

    return (
        <div className="sm:max-w-[1100px] sm:mx-auto flex justify-center flex-col pt-5">
            {isImageLoaded && (
                <div className="sm:absolute top-0 left-0 w-screen overflow-hidden"> 
                    <img 
                        src="/rickyy.gif" 
                        alt="Rick"
                        draggable={false}
                        className="w-[40px] sm:w-[50px] sliding-image" 
                    />
                </div>
            )}
            <div className="mx-auto text-wrap md:max-w-2xl py-8 sm:py-16 px-4 sm:px-6 relative">
                <h2 className="text-xl sm:text-2xl font-medium text-[#1a1a1a]">Arjun Aditya</h2>
                <p className="text-xs sm:text-sm text-[#a7a7a7]">Programmer / Designer</p>
                <div className="py-4 sm:py-6">
                    <div className="section">
                        <h3 className="ttl">Myself</h3>
                        <p className="txt text-sm sm:text-base">
                            The point is, I enjoy almost everything from ui/ux design (despite being colorblind) to programming, marketing, writing, and finances.
                        </p>
                        <p className="txt text-sm sm:text-base">
                            I started my programming journey in 2015 when I wanted to create my own version of Minecraft because that 90-minute free trial used to get on my nerves. Spent Some time in financial markets as well.
                        </p>
                        <p className="txt text-sm sm:text-base">
                            Currently, I work as a full-stack developer at <a href="https://zerops.io/" target="_blank">Zerops</a>, but I like to dabble in whatever comes my way.
                        </p>
                    </div>
                    <div className="section">
                        <h3 className="ttl">Socials</h3>
                        <p className="txt font-thin">
                            Checkout my <a href="https://x.com/nermalcat69" target="_blank">Twitter</a>, <a href="https://github.com/nermalcat69" target="_blank">Github</a>, <a href="https://unsplash.com/@arjunaditya" target="_blank">Unsplash</a>, <a href="https://read.cv/nermal" target="_blank">Read.cv</a> and <a href="https://instagram.com/nermalcat69" target="_blank">Instagram</a>.
                        </p>
                    </div>
                    <div className="section">
                        <ServerMetrics />
                    </div>
                    <div className="section">
                        <SomeComponent />
                    </div>
                    <div className="section">
                        <LovedImages />
                    </div>

                </div>
                {/* <Levitate /> */}
                <WindowSize />
            </div>
        </div>
    );
}

export default App;
