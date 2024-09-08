interface NavItem {
    label?: string;
    href: string;
    icon: string;
}

export function Nav() {
    const currentPath = window.location.pathname; // Get current path

    const items: NavItem[] = [
        { label: "Guestbook", href: "/", icon: "/icon.svg" },
        { href: "/another-page", icon: "/icon.svg" },
        { label: "nermal", href: "/nermal", icon: "/icon.svg" },
        { href: "/some-other-page", icon: "/icon.svg" },
    ];

    return (
        <div className="absolute top-20 rotate-12 -right-20 hover:right-0 duration-[600ms] mx-6 flex justify-center rounded-full bg-neutral-900 border border-[#392A32] rectangle items-center">
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
                        {item.label && <span>{item.label}</span>}
                    </a>
                );
            })}
        </div>
    );
}
