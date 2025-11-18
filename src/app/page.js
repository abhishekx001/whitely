import Navbar from '../components/Navbar'
import ProductHero from '../components/ProductHero'
import FeaturedProducts from '../components/FeaturedProducts'
import OurProducts from '../components/OurProducts'
import BestSkincare from '../components/BestSkincare'
import InstagramFeed from '../components/InstagramFeed'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <ProductHero />
      <FeaturedProducts />
      <OurProducts />
      <BestSkincare />
      <InstagramFeed />
      <Footer />
    </>
  )
}

