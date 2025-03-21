import { ReactNode } from "react";
import { DealsIcon, TransactionsIcon, VerifierIcon } from "@/assets";
import XpressLogo from "../XpressLogo";

interface NavItemProps {
  href: string;
  icon: ReactNode;
  text: string;
  isActive?: boolean;
  comingSoon?: boolean;
}

export function NavItem({
  href,
  icon,
  text,
  isActive,
  comingSoon,
}: NavItemProps) {
  return (
    <li>
      <a
        href={href}
        className={`flex items-center gap-x-3 px-3 py-3 text-sm font-medium ${
          isActive
            ? "text-xpress-blue bg-blue-50 border-l-4 rounded-bl-sm rounded-tl-sm border-xpress-blue"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <div className="flex-shrink-0">{icon}</div>
        <span className="flex-grow whitespace-nowrap min-w-0">{text}</span>
        {comingSoon && (
          <span className="flex-shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-xpress-blue text-white shadow-md ml-1">
            Soon
          </span>
        )}
      </a>
    </li>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-60 bg-white border-r border-gray-200 h-full">
      <div className="pt-10 px-8">
        <XpressLogo linkTo="/dashboard" className="h-6" />
      </div>

      <nav className="pt-12 mx-5">
        <ul className="space-y-4">
          <NavItem
            href="#verifiers"
            icon={<VerifierIcon />}
            text="Verifiers"
            isActive={true}
          />
          <NavItem
            href="#deals"
            icon={<DealsIcon />}
            text="Deals"
            comingSoon={true}
          />
          <NavItem
            href="#transactions"
            icon={<TransactionsIcon />}
            text="Transactions"
            comingSoon={true}
          />
        </ul>
      </nav>
    </aside>
  );
}
