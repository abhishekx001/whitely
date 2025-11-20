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

export default function Home() {
  const testimonials = [
    {
      id: 6,
      quote: "Excellent products! Highly satisfied with the results and quality.",
      name: "Customer",
      role: "Customer",
      videoSrc: "/video5.mp4"
    },
    {
      id: 5,
      quote: "Absolutely love Whitely products! The quality is outstanding and the results speak for themselves.",
      name: "Customer",
      role: "Customer",
      videoSrc: "/video4.mp4"
    },
    {
      id: 3,
      quote: "Whitely products transformed my skincare routine. Visible results in just weeks!",
      name: "Sneha Reddy",
      role: "Customer",
      videoSrc: "/review4.mp4"
    },
    {
      id: 2,
      quote: "Love the body lotion! It keeps my skin soft and glowing all day long. Highly recommend!",
      name: "Anjali Patel",
      role: "Customer",
      videoSrc: "/review2.mp4"
    },
    {
      id: 1,
      quote: "Amazing results! My skin has never looked better. The brightening cream is a game changer.",
      name: "Priya Sharma",
      role: "Customer",
      videoSrc: "/review1.mp4"
    },
    {
      id: 4,
      quote: "The lip mask is incredible! My lips are so smooth and hydrated. Best product ever!",
      name: "Riya Mehta",
      role: "Customer",
      videoSrc: "/review3.mp4"
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
    </>
  )
}

