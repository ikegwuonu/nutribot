import Link from "next/link";
import { Utensils } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="h-6 w-6" />
              <span className="text-xl font-bold">NutriBot</span>
            </div>
            <p className="text-green-100">
              Your personal Nigerian meal planning assistant.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Food Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Food Items
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Fruits
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Vegetables
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Recipes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-green-100">Email: info@nutribot.com</li>
              <li className="text-green-100">Phone: +234 123 456 7890</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
          <p>
            &copy; {new Date().getFullYear()} NutriBot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
