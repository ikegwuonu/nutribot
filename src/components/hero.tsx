import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Utensils, Apple, Carrot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showFoodCategories?: boolean;
}

export default function Hero({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  showFoodCategories = true,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-slate-100 to-red-500/20 z-0"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-red-500/20 to-green-500/20 rounded-full blur-3xl"></div>

      <div className="container relative z-10 py-12 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="">
            <p className="text-2xl md:text-3xl pb-3 lg:text-5xl font-bold leading-tight">
              {title}
            </p>
            <p className="text-lg text-muted-foreground py-5">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                asChild
              >
                <Link href={primaryButtonLink}>
                  {primaryButtonText}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {secondaryButtonText && secondaryButtonLink && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 inset-0 "></div>
            <div className="">
              <Image
                src="/1.png"
                alt="Nigerian cuisine"
                width={500}
                height={400}
                className="rounded-2xl w-full h-auto object-cover a"
              />
              {showFoodCategories && (
                <div className="mt-3 grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded-xl flex flex-col items-center">
                    <Utensils className="h-6 w-6 text-green-600 mb-2" />
                    <span className="text-sm font-medium">Food Items</span>
                  </div>
                  <div className="bg-red-50 p-3 rounded-xl flex flex-col items-center">
                    <Apple className="h-6 w-6 text-red-600 mb-2" />
                    <span className="text-sm font-medium">Fruits</span>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-xl flex flex-col items-center">
                    <Carrot className="h-6 w-6 text-yellow-600 mb-2" />
                    <span className="text-sm font-medium">Vegetables</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
