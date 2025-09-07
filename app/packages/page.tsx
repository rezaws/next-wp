import { Package } from '@/app/types/wp-pkg'
import { CheckIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

async function getPackages(): Promise<Package[]> {
  const res = await fetch('http://localhost:10010/wp-json/wp/v2/packages', {
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error('Failed to fetch packages')
  return res.json()
}

export default async function PackagesPage() {
  const packages = await getPackages()

  const tiers = packages.map(pkg => ({
    name: pkg.title.rendered,
    id: `tier-${pkg.id}`,
    href: pkg.meta._pkg_href,
    price: pkg.meta._pkg_price,
    description: pkg.meta._pkg_description,
    features: pkg.meta._pkg_features
      ? pkg.meta._pkg_features.split(',').map(f => f.trim())
      : [],
    featured: pkg.meta._pkg_featured === true,
  }))

  return (
    <div className="relative isolate bg-white sm:py-32 lg:px-8">

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-center text-2xl font-bold mb-6">بسته های انتخابی</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plans for you
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 pt-10">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={clsx(
              tier.featured ? 'relative bg-gray-900 shadow-2xl rounded-none' : 'bg-white/60 sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx !== 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-2xl'
                  : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
            )}
          >
            <h3
              id={tier.id}
              className={clsx(
                tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                'text-base font-semibold'
              )}
            >
              {tier.name}
            </h3>

            <p className="mt-4 flex items-baseline gap-x-2">
              <span className={clsx(
                tier.featured ? 'text-white' : 'text-gray-900',
                'text-5xl font-semibold tracking-tight'
              )}>
                {tier.price}
              </span>
              <span className={clsx(
                tier.featured ? 'text-gray-400' : 'text-gray-500',
                'text-base'
              )}>
              </span>
            </p>

            <p className={clsx(
              tier.featured ? 'text-gray-300' : 'text-gray-600',
              'mt-6 text-base'
            )}>
              {tier.description}
            </p>

            <ul role="list" className={clsx(
              tier.featured ? 'text-gray-300' : 'text-gray-600',
              'mt-8 space-y-3 text-sm sm:mt-10'
            )}>
              {tier.features.map((feature, i) => (
                <li key={i} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={clsx(
                      tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                      'h-6 w-5 flex-none'
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={clsx(
                tier.featured
                  ? 'bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500'
                  : 'text-indigo-600 ring-1 ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}