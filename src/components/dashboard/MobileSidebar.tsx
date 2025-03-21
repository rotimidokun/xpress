import { X } from "lucide-react";
import XpressLogo from "../XpressLogo";
import { DealsIcon, TransactionsIcon, VerifierIcon } from "@/assets";
import { NavItem } from "./Sidebar";

export function MobileSidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile sidebar - overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile sidebar - content */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <XpressLogo linkTo="/dashboard" className="h-6" />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="pt-6 px-4">
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
          </div>
        </div>
      </div>
    </>
  );
}
