import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { execSync } from 'child_process'

// Get the current Git commit hash (short version)
// Added a fallback string in case git is not initialized
const commitHash = execSync('git rev-parse --short HEAD').toString().trim()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // Use 'define' to inject the variable so import.meta.env can see it
  define: {
    'import.meta.env.VITE_GIT_COMMIT_HASH': JSON.stringify(commitHash),
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
    allowedHosts: true
  }
})
