import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerText?: string;
  footerLink?: string;
  footerLinkText?: string;
  backButton?: React.ReactNode;
}

export default ({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
  backButton,
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        {backButton && <div className="mb-6">{backButton}</div>}

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="text-gray-500 text-sm mt-2">{subtitle}</p>}
        </div>

        {children}

        {footerText && footerLink && (
          <div className="mt-6 text-center text-sm text-gray-600">
            {footerText}{" "}
            <Link
              to={footerLink}
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              {footerLinkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
