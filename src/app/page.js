import Navbar from '../components/Navbar'
import ProductHero from '../components/ProductHero'
import FeaturedProducts from '../components/FeaturedProducts'
import OurProducts from '../components/OurProducts'
import BestSkincare from '../components/BestSkincare'
import InstagramFeed from '../components/InstagramFeed'
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <ProductHero />
      <FeaturedProducts />
      <OurProducts />
      <BestSkincare />
      <InstagramFeed />
      <Footer />
      <WhatsAppButton />
    </>
  )
}

