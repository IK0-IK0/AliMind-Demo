import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'fs'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-onnx-wasm',
      closeBundle() {
        // Copy ONNX Runtime WASM files to dist
        const wasmFiles = [
          'ort-wasm.wasm',
          'ort-wasm-simd.wasm',
          'ort-wasm-threaded.wasm',
          'ort-wasm-simd-threaded.wasm',
        ];
        
        try {
          mkdirSync('dist', { recursive: true });
          wasmFiles.forEach(file => {
            try {
              copyFileSync(
                join('node_modules', 'onnxruntime-web', 'dist', file),
                join('dist', file)
              );
              console.log(`✓ Copied ${file}`);
            } catch (e) {
              console.warn(`⚠ Could not copy ${file}:`, e.message);
            }
          });
        } catch (e) {
          console.warn('⚠ Could not create dist directory:', e.message);
        }
      },
    },
  ],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['@xenova/transformers', 'onnxruntime-web'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          transformers: ['@xenova/transformers'],
        },
      },
    },
  },
  resolve: {
    alias: {
      // Fix for ONNX Runtime Web in production builds
      'onnxruntime-web': 'onnxruntime-web/dist/ort.min.js',
    },
  },
})
