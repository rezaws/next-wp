export interface Post {
  id: number
  title: { rendered: string }
  date: string
  author: number
  featured_media: number
}

export interface Ads {
  id: number;
  title: {rendered: string}
  logo_url: string
}

export interface Media {
  id: number
  source_url: string
}

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
