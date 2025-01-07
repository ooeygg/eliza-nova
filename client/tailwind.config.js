/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
        },
    },
    plugins: [
        function({ addUtilities }) {
            addUtilities({
                '.animate-gradient-x': {
                    '@keyframes gradient-x': {
                        '0%, 100%': {
                            'background-size': '200% 200%',
                            'background-position': 'left center'
                        },
                        '50%': {
                            'background-size': '200% 200%',
                            'background-position': 'right center'
                        }
                    },
                    'animation': 'gradient-x 15s ease infinite'
                }
            }),
            addUtilities({
                '.text-shadow-neon': {
                    'text-shadow': `
                        0 0 20px rgba(var(--primary-rgb), 0.7),
                        0 0 40px rgba(var(--primary-rgb), 0.5),
                        0 0 60px rgba(var(--primary-rgb), 0.3)
                    `
                }
            })
        }
    ],
    theme: {
        extend: {
            ...theme.extend,
            variables: {
                '--primary-rgb': '147, 51, 234'
            }
        }
    }
};
