const Schema = {
  title: "Editable Carousel",
  description: "Carrossel de cards editável pelo Site Editor.",
  type: "object",
  properties: {
    items: {
      title: "Cards",
      type: "array",
      minItems: 1,
      items: {
        title: "Card",
        type: "object",
        properties: {
          image: {
            title: "Imagem",
            type: "string",
            widget: {
              "ui:widget": "image-uploader",
            },
          },
          imageAlt: {
            title: "Texto alternativo",
            type: "string",
          },
          title: {
            title: "Título",
            type: "string",
          },
          text: {
            title: "Texto",
            type: "string",
          },
          link: {
            title: "Link",
            type: "object",
            properties: {
              url: {
                title: "URL",
                type: "string",
              },
              label: {
                title: "Texto do link",
                type: "string",
              },
              openNewTab: {
                title: "Abrir em nova aba",
                type: "boolean",
                default: false,
              },
            },
          },
        },
      },
    },
    showArrows: {
      title: "Mostrar setas",
      type: "boolean",
      default: true,
    },
    showDots: {
      title: "Mostrar bolinhas",
      type: "boolean",
      default: true,
    },
    itemsPerPageDesktop: {
      title: "Itens por página (desktop)",
      type: "number",
      default: 3,
      minimum: 1,
      maximum: 6,
    },
    itemsPerPageTablet: {
      title: "Itens por página (tablet)",
      type: "number",
      default: 2,
      minimum: 1,
      maximum: 4,
    },
    itemsPerPageMobile: {
      title: "Itens por página (mobile)",
      type: "number",
      default: 1,
      minimum: 1,
      maximum: 3,
    },
  },
};

export default Schema;