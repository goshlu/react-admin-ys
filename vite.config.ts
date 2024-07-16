import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import {wrapperEnv} from "./src/utils/getEnv";
import viteCompression from "vite-plugin-compression"

// https://vitejs.dev/config/
export default defineConfig( (mode:ConfigEnv):UserConfig => {
  const env = loadEnv(mode.mode, process.cwd());
   const viteEnv: ViteEnv = wrapperEnv(env)
  return {
    plugins: [
      react(),
      viteEnv.VITE_COMPRESSION &&   viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
        deleteOriginFile: false,
        filter: /\.(js|mjs|cjs|ts|json)$/i
      })],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 路径一定要是绝对路径
      },
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      proxy: {
        // "/api": {
        //   target: viteEnv.VITE_PROXY_URL,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, "")
        // }
      }
    },
    build: {
      outDir: "dist",
      // esbuild: 打包更快，但是缺点是不能去除console.log
      // terser: 打包更慢，但是可以去除console.log

      // minify: "terser",
      // terserOptions: {
      //   compress: {
      //     drop_console: viteEnv.VITE_DROP_CONSOLE,
      //     drop_debugger: true
      //   }
      // }
      minify: "esbuild",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  }
})
