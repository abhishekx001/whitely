import Navbar from '../components/Navbar'
import ProductHero from '../components/ProductHero'
import FeaturedProducts from '../components/FeaturedProducts'
import OurProducts from '../components/OurProducts'
import BestSkincare from '../components/BestSkincare'
import HowToUse from '../components/HowToUse'
import TestimonialSection from '../components/TestimonialSection'
import InstagramFeed from '../components/InstagramFeed'
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen'
import WhatsAppButton from '../components/WhatsAppButton'
import ProductChatWidget from '../components/ProductChatWidget'

export default function Home() {
  const testimonials = [
    {
      id: 7,
      quote: "Whitely has completely transformed my skincare routine! I am obsessed with the results.",
      name: "Customer",
      role: "Customer",
      videoSrc: "/videos/vid1.mp4"
    },
    {
      id: 6,
      quote: "Excellent products! Highly satisfied with the results and quality.",
      name: "Customer",
      role: "Customer",
      videoSrc: "/videos/vid2.mp4"
    },
    {
      id: 5,
      quote: "Absolutely love Whitely products! The quality is outstanding and the results speak for themselves.",
      name: "Customer",
      role: "Customer",
      videoSrc: "/videos/vid3.mp4"
    },
    {
      id: 3,
      quote: "Whitely products transformed my skincare routine. Visible results in just weeks!",
      name: "Sneha Reddy",
      role: "Customer",
      videoSrc: "/videos/vid4.mp4"
    },
    {
      id: 2,
      quote: "Love the body lotion! It keeps my skin soft and glowing all day long. Highly recommend!",
      name: "Anjali Patel",
      role: "Customer",
      videoSrc: "/videos/vid5.mp4"
    }
  ]

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <ProductHero />
      <FeaturedProducts />
      <OurProducts />
      <BestSkincare />
      <HowToUse />
      <TestimonialSection
        title="What Our Customers Say"
        subtitle="Real reviews from real customers who love Whitely products"
        testimonials={testimonials}
      />
      <InstagramFeed />
      <Footer />
      <WhatsAppButton />
      <ProductChatWidget />
    </>
  )
}

