
import { Link } from "react-router-dom";

interface XpressLogoProps {
  className?: string;
}

const XpressLogo = ({ className = "h-8" }: XpressLogoProps) => {
  return (
    <Link to="/" className="logo-animation">
      <svg
        width="110"
        height="24"
        viewBox="0 0 110 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Simplified SVG representing the Xpress logo */}
        <path
          d="M0 2.86957C0 1.28435 1.28435 0 2.86957 0H21.1304C22.7157 0 24 1.28435 24 2.86957V21.1304C24 22.7157 22.7157 24 21.1304 24H2.86957C1.28435 24 0 22.7157 0 21.1304V2.86957Z"
          fill="#009DE0"
        />
        <path
          d="M5.5 6L10.5 12L5.5 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 6H18.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 12H18.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 18H18.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M37.3691 6.59H41.2491L44.1411 13.324L47.0631 6.59H50.9011L43.8691 20H44.4411L44.1411 22H39.6291L31.3471 6.59H37.3691ZM55.9388 22H50.6638L56.8278 6.59H64.1648L70.3008 22H65.0258L64.1368 19.156H58.3108L57.4218 22H55.9388ZM59.6448 15.634H62.8028L61.2068 10.79L59.6448 15.634ZM70.0298 6.59H75.3048L80.5938 15.4L80.6218 6.59H85.5678L85.5398 22H80.2928L74.9758 13.156L75.0038 22H70.0578L70.0298 6.59ZM88.4028 6.59H106.241V10.454H98.8968V12.196H104.331V15.708H98.8968V18.136H106.437V22H88.4028V6.59Z"
          fill="#009DE0"
        />
      </svg>
    </Link>
  );
};

export default XpressLogo;
