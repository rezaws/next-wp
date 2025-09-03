export interface Package {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  slug: string
  meta: {
    _pkg_href: string
    _pkg_price: string
    _pkg_description: string
    _pkg_features: string // رشته کامادار
    _pkg_featured: string // 'true' یا 'false'
  }
}
