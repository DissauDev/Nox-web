/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ['./src/**/*.{js,jsx,ts,tsx}', './grapesjs-blocks/**/*.js'],
	safelist: [
		{
		  // capturar clases como bg-[#06060a], blur-3xl, text-balance…
		  pattern: /^(bg|text|blur|font|tracking|p|m|w|h|flex|items|justify|rounded|hover):?/,
		},
		{
		  // para clases arbitrarias con corchetes
		  pattern: /\[.*\]/,
		},
	  ],
	
  theme: {
  	extend: {
  		colors: {
  			'black-night': {
  				'50': '#f5f5fa',
  				'100': '#eaeaf4',
  				'200': '#d1d2e6',
  				'300': '#a9add0',
  				'400': '#7a80b6',
  				'500': '#595f9e',
  				'600': '#464983',
  				'700': '#393b6b',
  				'800': '#32345a',
  				'900': '#2e2f4c',
  				'950': '#06060a'
  			},
  			grape: {
  				'50': '#f8f6fd',
  				'100': '#f2edfa',
  				'200': '#e5daf4',
  				'300': '#d2bdea',
  				'400': '#b996dc',
  				'500': '#9a6cc9',
  				'600': '#7f4dac',
  				'700': '#693d8e',
  				'800': '#573375',
  				'900': '#4b2e61',
  				'950': '#3a1b51'
  			},
  			'brown-coockies': {
  				'500': '#c4744b',
  				'600': '#b66040'
  			},
  			'midnight-blue': {
  				'50': '#f2eeff',
  				'100': '#e8e0ff',
  				'200': '#d8c8fd',
  				'300': '#c1a6fb',
  				'400': '#b082f7',
  				'500': '#a765ef',
  				'600': '#9d48e3',
  				'700': '#893ac8',
  				'800': '#6f31a2',
  				'900': '#5a2f80',
  				'950': '#21112e'
  			},
  			rose: {
  				'50': '#fef1f8',
  				'100': '#fde6f3',
  				'200': '#fecce7',
  				'300': '#ffa2d2',
  				'400': '#fd69b3',
  				'500': '#f83c95',
  				'600': '#e92679',
  				'700': '#ca0c57',
  				'800': '#a70d48',
  				'900': '#8b1040',
  				'950': '#550221'
  			},
  			'mustard-yellow': {
  				'400': '#f7a823',
  				'500': '#f1880f'
  			},
  			affair: {
  				'50': '#faf7fd',
  				'100': '#f4ecfb',
  				'200': '#eaddf7',
  				'300': '#dac2f0',
  				'400': '#c39be5',
  				'500': '#ab74d8',
  				'600': '#9556c7',
  				'700': '#8042ae',
  				'800': '#723e97',
  				'900': '#583073',
  				'950': '#3b1952'
  			},
  			pompadour: {
  				'50': '#fff1fc',
  				'100': '#ffe2fb',
  				'200': '#ffc3f6',
  				'300': '#ff95eb',
  				'400': '#ff56df',
  				'500': '#ff18d7',
  				'600': '#ff00e9',
  				'700': '#d700c2',
  				'800': '#af009c',
  				'900': '#710162',
  				'950': '#620055'
  			},
  			'creamy-white': {
  				'50': '#fef8eb',
  				'100': '#fbebca',
  				'200': '#f8d78f',
  				'300': '#f4bd55',
  				'400': '#f1a32e',
  				'500': '#ea8216',
  				'600': '#cf6010',
  				'700': '#ac4211',
  				'800': '#8c3414',
  				'900': '#732b14',
  				'950': '#421406'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		  fontFamily: {
			ArialBold:   ['ArialBold','sans-serif'],
			ArialRegular:['ArialRegular','sans-serif'],
			ArialLight:  ['ArialLight','sans-serif'],
			CamilaFont:  ['CamilaFont','sans-serif'],    // ← no 'CamilaFont '
			FreeStyleFont:['FreeStyleFont','sans-serif'],
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}