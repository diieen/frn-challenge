import React, { useMemo } from 'react'
import { Helmet } from 'vtex.render-runtime'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'

import Arrows from './components/Arrows'
import Card from './components/Card'
import Schema from './schema'

import styles from './style.css'

const EditableCarousel: StorefrontFunctionComponent<EditableCarouselProps> = ({
  items,
  showArrows = true,
  showDots = true,
  itemsPerPageDesktop = 3,
  itemsPerPageTablet = 2,
  itemsPerPageMobile = 1,
}) => {
  const options = useMemo(
    () => ({
      type: 'slide',
      perPage: Math.max(itemsPerPageDesktop || 1, 1),
      perMove: 1,
      gap: '1rem',
      arrows: showArrows,
      pagination: showDots,
      breakpoints: {
        1024: {
          perPage: Math.max(itemsPerPageTablet || 1, 1),
        },
        768: {
          perPage: Math.max(itemsPerPageMobile || 1, 1),
        },
      },
    }),
    [itemsPerPageDesktop, itemsPerPageTablet, itemsPerPageMobile, showArrows, showDots]
  )

  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className={`${styles.carousel} w-100 relative`}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css"
        />
      </Helmet>

      <Splide hasTrack={false} options={options}>
        <SplideTrack>
          {items.map((item, index) => (
            <SplideSlide key={`${item.title || 'card'}-${index}`}>
              <Card {...item} />
            </SplideSlide>
          ))}
        </SplideTrack>

        {showArrows && <Arrows />}
        {showDots && <ul className="splide__pagination" />}
      </Splide>
    </section>
  )
}

EditableCarousel.getSchema = () => Schema;

export default EditableCarousel
