interface NavItem {
    label?: string;
    href: string;
    icon: string;
}

export function Nav() {
    const currentPath = window.location.pathname;

    const items: NavItem[] = [
        { label: "guests", href: "/guests", icon: "/guestbook.svg" },
        { label: "exp", href: "/experience", icon: "/experience.svg" },
        { label: "me", href: "/me", icon: "/profile.svg" },
        { label: "blog",href: "/blog", icon: "/blog.svg" },
    ];

    return (
        <>
            <div className="fixed top-20 hover:rotate-0 rotate-12 -right-20 hover:right-0 duration-[600ms] mx-6 flex justify-center rounded-full bg-neutral-900 border border-[#392A32]  items-center">
                {items.map((item, index) => {
                    const isActive = currentPath === item.href;
                    return (
                        <a
                            key={index}
                            href={item.href}
                            className={`text-[#EEEEEE] navbtn ${isActive ? 'bg-neutral-800' : 'hover:bg-neutral-800'} border-r border-[#392A32] px-4 py-2.5 flex items-center ${index === 0 ? "pl-6 rounded-l-full" : ""
                                } ${index === items.length - 1 ? "pr-6 rounded-r-full" : ""
                                }`}
                        >
                            <img src={item.icon} alt={`${item.label || "icon"}`} className={`w-4 h-4 mr-2 ${isActive ? 'text-neutral-800' : ''}`} />
                            {item.label && <span className="text-[#eee]">{item.label}</span>}
                        </a>
                    );
                })}
            </div>
            <div className="fixed top-20 -rotate-12 hover:rotate-0 -left-10 hover:-left-3 duration-[600ms] mx-6 flex justify-center rounded-full bg-neutral-900 border border-[#392A32] items-center">
                <a
                    href="/"
                    className={`text-[#EEEEEE] ${currentPath === '/' ? 'border border-[#D01B68]' : 'hover:bg-neutral-800'
                        } border-r border-[#392A32] px-4 py-2.5 flex items-center rounded-full`}
                >
                    <img
                        src="/home.svg"
                        alt="icon"
                        className={`w-4 h-4 mr-2 ${currentPath === '/' ? 'text-neutral-800' : ''}`}
                    />
                    <span className="text-[#eee]">home</span>
                </a>
            </div>
        </>
    );
}
