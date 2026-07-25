import { products } from '../../../data/products'
import ProductDetailClient from './ProductDetailClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export function generateMetadata({ params }) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) return {}

  return {
    title: `${product.name} | Whitely Beauty`,
    description: product.description,
  }
}

export default function ProductPage({ params }) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
