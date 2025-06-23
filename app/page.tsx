import { HeroSection } from '@/components/sections/hero-section';
import { CategoriesSection } from '@/components/sections/categories-section';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}