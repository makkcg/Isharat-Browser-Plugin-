export default [
  {
    id: 1,
    key: "large_font",
    icon: "fa-solid fa-text-height",
    name: {
      english: "Large Text",
      arabic: "تكبير النص"
    },
    values: [1, 1.2, 1.4, 1.6, 2],
    currentValue: 1,
    active: false
  },
  {
    id: 2,
    key: "text_spacing",
    icon: "fa-solid fa-arrows-left-right",
    name: {
      english: "Text Spacing",
      arabic: "تباعد الخط"
    },
    values: [0, 2, 3, 4, 6, 8],
    currentValue: 0,
    active: false
  },
  {
    id: 3,
    key: "line_height",
    icon: "fa-solid fa-arrows-up-down",
    name: {
      english: "Line Height",
      arabic: "إرتفاع الخط"
    },
    values: [1, 1.1, 1.2, 1.4, 1.6],
    currentValue: 1,
    active: false
  },
  {
    id: 5,
    key: "text_align",
    icon: "fa-solid fa-align-left",
    name: {
      english: "Text Align",
      arabic: "محاذاة النص"
    },
    values: ["default", "left", "center", "right"],
    currentValue: "default",
    active: false
  },
  {
    id: 6,
    key: "contrast",
    icon: "fa-solid fa-circle-half-stroke",
    name: {
      english: "Contrast",
      arabic: "التباين"
    },
    values: [100, 150, 200, 300],
    currentValue: 100,
    active: false
  },
  {
    id: 7,
    key: "saturation",
    icon: "fa-solid fa-droplet",
    name: {
      english: "Saturation",
      arabic: "تشبع اللون"
    },
    values: [1, 2, 3, 0],
    currentValue: 1,
    active: false
  },
  {
    id: 8,
    key: "highlight_links",
    icon: "fa-solid fa-link",
    name: {
      english: "Highlight Links",
      arabic: "إبراز الروابط"
    },
    active: false
  },
  {
    id: 9,
    key: "hide_images",
    icon: "fa-solid fa-image",
    name: {
      english: "Hide Images",
      arabic: "إخفاء الصور"
    },
    active: false
  }
];
