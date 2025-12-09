type CarouselLink = {
  url: string
  label?: string
  openNewTab?: boolean
}

type CarouselItem = {
  image: string
  imageAlt?: string
  title?: string
  text?: string
  link?: CarouselLink
}

type EditableCarouselProps = {
  items?: CarouselItem[]
  showArrows?: boolean
  showDots?: boolean
  itemsPerPageDesktop?: number
  itemsPerPageTablet?: number
  itemsPerPageMobile?: number
}