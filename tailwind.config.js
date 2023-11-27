/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontSize: {
      'xs'  : '0.625rem',
      'sm'  : '0.75rem',
      'md'  : '0.8125rem',
      'base': '0.875rem',
      'lg'  : '1rem',
      'xl'  : '1.1rem',
      '2xl' : '1.125rem',
      '3xl' : '1.25rem',
      '4xl' : '1.75rem',
      '5xl' : '2.25rem',
      '6xl' : '2.5rem',
      '7xl' : '3rem',
      '8xl' : '4rem',
      '9xl' : '6rem',
      '10xl': '8rem'
  },
  screens : {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1440px'
  },
    extend: {
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '50': '12.5rem',
        '90': '22.5rem',

        // Bigger values
        '100': '25rem',
        '120': '30rem',
        '128': '32rem',
        '130': '33rem',
        '140': '35rem',
        '160': '40rem',
        '180': '45rem',
        '192': '48rem',
        '200': '50rem',
        '240': '60rem',
        '256': '64rem',
        '280': '70rem',
        '320': '80rem',
        '360': '90rem',
        '400': '100rem',
        '480': '120rem',

        // Fractional values
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%'
      },
    },
  },
  plugins: [],
}