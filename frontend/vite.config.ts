import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Base e URLs vêm do .env (ver comentários lá), para o mesmo código servir
// GitHub Pages, domínio próprio ou localhost sem editar este arquivo.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE || '/',
    plugins: [react()],
  }
})
