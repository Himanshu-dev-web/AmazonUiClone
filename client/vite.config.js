import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    
    'process.env': process.env,
  },
  env :{
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
}
  
})
