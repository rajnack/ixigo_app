import type { Config } from "tailwindcss";


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontSize: {
        
        'body-2xs': '12px',
        'body-3xs': '13px',
        'xl': '20px',
        'body-lg': '18px',
        'body-xs': '14px',
        'body-sm': '14px',
        'body-md': '16px',
        'body-xl': '20px',
        'body-xxl': '24px',
        'body-xxxl': '28px',
      },
      colors: {
        'custom-gray': '#5E616E',
        'custom-dark': '#17181C',
        'custom-blue': '#0770E4',
        'custom-active': '#18171C',
        'custom-purple': 'rgb(110, 24, 185)',
        'selection-outline': '#0770ED',
        lightGray: 'rgb(200 202 208)',
        charcoal: 'rgb(244, 245, 245)',
        'neutral-subtle-over': 'rgb(238, 240, 244)',
        'selection-over': '#f5f5f5',
        'subbrand-50': '#e0f7fa',
        'primary-over': '#efefef',
        'custom-sky': 'rgb(238, 248, 255)',
        'customNeutral': 'rgb(214 215 219)',
        customGray: 'rgb(228 228 231)',
        'primary':'#17181C',
        'secondary':'#5E616E',
        'brand-outline':'#FC790D',
        'brand-outline-over': '#FFFAE6',
        'subbrand-500':'#0770EA',
        'neutral-40':'rgb(244 245 245)',
        "disabled": 'rgb(239 239 240)',
        "charcoal-400":'#848794',
        'border-primary':'rgb(132 135 148)',
        'subbrand-100':'rgb(242 249 255)',
        'brand-solid':'rgb(252 121 13)'
      },
      spacing: {
        '5': '0.25rem',
        '20': '1rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '1-10': '10px 1px 1px 10px',
        '10': '10px',
        'border-r': '1px',
        'xl':'.75rem',
        'border-b': '1px',
        't-20': '20px',
        'selection-subtle':'rgb(186 219 255)'
        
      },
    },
  },

  variants: {
    extend: {
      backgroundColor: ['hover'], 
      transform: ['hover', 'group-hover'],
      translate: ['hover', 'group-hover'],
    },
  },

  plugins: [
    require('tailwind-scrollbar-hide'), 
  ],
} satisfies Config;
