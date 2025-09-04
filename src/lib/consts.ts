export const UI_MESSAGES = {
  LOADING: {
    STORY: "Generando historia...",
    IMAGE: "Generando imagen...",
  },
  ERROR: {
    STORY_GENERATION: "Error al generar historia",
    IMAGE_GENERATION: "Error al generar imagen",
    MISSING_PROMPT: "Falta el prompt para generar la historia",
  },
  PLACEHOLDERS: {
    INPUT:
      "Describe qué quieres hacer, adónde ir, qué examinar o cómo reaccionar...",
  },
};

export const GAME_CONFIG = {
  IMAGE: {
    DEFAULT_PROMPT: "Blossom Coffee Shop with a famous Friends character",
    SEPARATOR: "IMAGEN: ",
    CAFE_REFERENCE:
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqOOxO2YLvLKZgmdcpqnjQ6-gfh94_M8LoGOxTlpLuUHFRnIRh3Ww62ZEOrsb5ROVGnl9ExOsbcJ-ZALAte-DaXcKSrRDiGGZgRKBJoQqAT_bEWQ7xXXlQOfVDW9h0iCgZdTk1z=s680-w680-h510-rw",
    FRIENDS_CAST_REFERENCES: [
      // Using direct image URLs that return proper image MIME types
      "https://i.pinimg.com/564x/1c/ae/a2/1caea20e681ce50e375d2524a66808c3.jpg", // Chandler Bing (Matthew Perry)
      "https://publish.purewow.net/wp-content/uploads/sites/2/2022/05/ross-gellar-friends-fb.jpg", // Ross Geller (David Schwimmer)
      "https://images.mummypages.ie/images/15147/757/37/1/5_27/monica-gellar-friends-mp.png", // Monica Geller (Courteney Cox)

    ],
  },
};
