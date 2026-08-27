import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#4C0000',
          dark: '#380000',
        },
        cream: {
          DEFAULT: '#FAF6F0',
          dark: '#e8e3da',
        },
        ink: '#2A211F',
        body: '#5C534F',
        muted: '#8a7d74',
        hairline: '#efe4d6',
        'hairline-strong': '#ece5db',
      },
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['Raleway', 'sans-serif'],
        script: ['Playball', 'cursive'],
      },
      maxWidth: {
        content: '1500px',
      },
      borderRadius: {
        card: '10px',
      },
      boxShadow: {
        card: '0 16px 44px rgba(76,0,0,.08)',
        'card-hover': '0 20px 44px rgba(76,0,0,.13)',
      },
      letterSpacing: {
        label: '0.24em',
        wordmark: '0.34em',
      },
    },
  },
}
