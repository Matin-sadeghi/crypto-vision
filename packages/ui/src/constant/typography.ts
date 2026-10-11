export const typography = {
    h1: {
      fontSize: "28px",
      lineHeight: "1.2",
    },
  
    h2: {
      fontSize: "25px",
      lineHeight: "1.2",
    },
    h3: {
        fontSize: "22px",
        lineHeight: "1.2",
      },
  
      h4: {
      fontSize: "20px",
      lineHeight: "1.2",
    },
  
    h5: {
        fontSize: "18px",
        lineHeight: "1.2",
      },
    
    body: {
      fontSize: "16px",
      lineHeight: "1.2",
    },
  
   helperText: {
    fontSize: "14px",
    lineHeight: "1.2",
  },

  caption: {
    fontSize: "12px",
    lineHeight: "1.2",
  },
  } as const;
  
  export type TypographyVariant = keyof typeof typography;