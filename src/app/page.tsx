import Link from "next/link";
import { Clock, Utensils, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FeatureCard from "@/components/feature-card";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Gradients */}
        <Hero
          title="Your Personal Nigerian Meal Planner"
          description="Generate customized meal plans with authentic Nigerian recipes based on your food preferences."
          primaryButtonText="Create Meal Plan"
          primaryButtonLink="/meal-planner"
          secondaryButtonText="Learn More"
          secondaryButtonLink="#features"
        />

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose NutriBot?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our intelligent meal planning system is designed specifically
                for Nigerian cuisine and dietary preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Nigerian Cuisine"
                description="Authentic Nigerian recipes tailored to your taste preferences and dietary needs."
                icon={Utensils}
                bgColor="bg-green-50"
                iconColor="text-green-600"
              />

              <FeatureCard
                title="Time-Saving"
                description="Get detailed recipes with preparation times to help you plan your meals efficiently."
                icon={Clock}
                bgColor="bg-red-50"
                iconColor="text-red-600"
              />

              <FeatureCard
                title="Balanced Nutrition"
                description="Ensure your meals are nutritionally balanced with the right mix of food items, fruits, and vegetables."
                icon={Apple}
                bgColor="bg-yellow-50"
                iconColor="text-yellow-600"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-green-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How NutriBot Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Generate your personalized Nigerian meal plan in just a few
                simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 pt-2">
                  Select Your Foods
                </h3>
                <p className="text-muted-foreground">
                  Choose from a variety of Nigerian food items, fruits, and
                  vegetables that you enjoy.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 pt-2">
                  Generate Meal Plan
                </h3>
                <p className="text-muted-foreground">
                  Our AI creates a balanced meal plan based on your selections
                  and dietary preferences.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 pt-2">
                  Get Recipes & Instructions
                </h3>
                <p className="text-muted-foreground">
                  Receive detailed recipes, ingredient lists, and preparation
                  times for each meal.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                asChild
              >
                <Link href="/meal-planner">Try It Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-red-500/20 z-0"></div>
          <div className="container relative z-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Plan Your Nigerian Meals?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Start creating delicious, nutritious meal plans tailored to
                  your preferences today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                  asChild
                >
                  <Link href="/meal-planner">Create Your Meal Plan</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
