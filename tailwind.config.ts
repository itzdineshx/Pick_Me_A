import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					border: 'hsl(var(--card-border))'
				},
				// Cinematic brand colors
				anime: {
					DEFAULT: 'hsl(var(--anime-crimson))',
					glow: 'hsl(var(--anime-crimson-glow))'
				},
				cinema: {
					DEFAULT: 'hsl(var(--cinema-gold))',
					glow: 'hsl(var(--cinema-gold-glow))'
				},
				music: {
					DEFAULT: 'hsl(var(--music-neon))',
					glow: 'hsl(var(--music-neon-glow))'
				},
				// Atmospheric elements
				fog: 'hsl(var(--fog-base))',
				particle: 'hsl(var(--particle-glow))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
					'100%': { opacity: '0', transform: 'translateY(-20px) scale(0.95)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.8)', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)', opacity: '1' },
					'100%': { transform: 'translateX(100%)', opacity: '0' }
				},
				'portal-enter': {
					'0%': { 
						transform: 'scale(0.5) rotateY(-90deg)', 
						opacity: '0',
						filter: 'blur(10px)'
					},
					'50%': {
						transform: 'scale(1.1) rotateY(0deg)',
						opacity: '0.8',
						filter: 'blur(2px)'
					},
					'100%': { 
						transform: 'scale(1) rotateY(0deg)', 
						opacity: '1',
						filter: 'blur(0px)'
					}
				},
				'portal-exit': {
					'0%': { 
						transform: 'scale(1) rotateY(0deg)', 
						opacity: '1',
						filter: 'blur(0px)'
					},
					'50%': {
						transform: 'scale(1.2) rotateY(45deg)',
						opacity: '0.5',
						filter: 'blur(5px)'
					},
					'100%': { 
						transform: 'scale(0) rotateY(90deg)', 
						opacity: '0',
						filter: 'blur(15px)'
					}
				},
				'smooth-bounce': {
					'0%, 100%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-10px) scale(1.05)' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px currentColor',
						filter: 'brightness(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px currentColor, 0 0 60px currentColor',
						filter: 'brightness(1.2)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'accordion-up': 'accordion-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-in': 'fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-out': 'fade-out 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				'scale-in': 'scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'scale-out': 'scale-out 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-out-right': 'slide-out-right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				'portal-enter': 'portal-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'portal-exit': 'portal-exit 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'smooth-bounce': 'smooth-bounce 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
				'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
				'spin-smooth': 'spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
				'pulse-smooth': 'pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
