/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

module.exports = {
  theme: {
    fontFamily: {
      display: ["Gilroy", "sans-serif"],
      body: ["Graphik", "sans-serif"]
    },
    extend: {
      colors: {
        cyan: "#9cdbff",
        cpink: {
          "100": "#9cdbf5",
          "200": "red",
          "300": "blue",
          "400": "green",
          "500": "yellow",
          "600": "#9cdbf5",
          "700": "#9cdbf1",
          "800": "#9cdbf2",
          "900": "#9cdbf1"
        }
      },
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        "72": "18rem",
        "108": "27rem"
      },
      margin: {
        "96": "24rem",
        "128": "32rem"
      }
    }
  },
  variants: {
    opacity: ["responsive", "hover"]
  }
};
