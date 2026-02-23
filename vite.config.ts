import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dir = path.dirname(fileURLToPath(import.meta.url));

function copyWasmPlugin(): Plugin {
  const llamacppWasm = path.resolve(
    __dir,
    "node_modules/@runanywhere/web-llamacpp/wasm"
  );
  const onnxWasm = path.resolve(
    __dir,
    "node_modules/@runanywhere/web-onnx/wasm"
  );

  return {
    name: "copy-wasm",
    apply: "build", // 🔥 Only run in production build
    writeBundle(options) {
      const outDir = options.dir ?? path.resolve(__dir, "dist");
      const assetsDir = path.join(outDir, "assets");
      fs.mkdirSync(assetsDir, { recursive: true });

      // LlamaCpp WASM
      const files = [
        "racommons-llamacpp.wasm",
        "racommons-llamacpp.js",
        "racommons-llamacpp-webgpu.wasm",
        "racommons-llamacpp-webgpu.js",
      ];

      for (const file of files) {
        const srcPath = path.join(llamacppWasm, file);
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, path.join(assetsDir, file));
          console.log(`✓ Copied ${file}`);
        }
      }

      // Sherpa ONNX
      const sherpaDir = path.join(onnxWasm, "sherpa");
      const sherpaOut = path.join(assetsDir, "sherpa");

      if (fs.existsSync(sherpaDir)) {
        fs.mkdirSync(sherpaOut, { recursive: true });
        for (const file of fs.readdirSync(sherpaDir)) {
          fs.copyFileSync(
            path.join(sherpaDir, file),
            path.join(sherpaOut, file)
          );
          console.log(`✓ Copied sherpa/${file}`);
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyWasmPlugin()],

  base: "./", // 🔥 important for relative WASM resolution

  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },

  assetsInclude: ["**/*.wasm"],

  worker: {
    format: "es",
  },

  optimizeDeps: {
    exclude: [
      "@runanywhere/web-llamacpp",
      "@runanywhere/web-onnx",
    ],
  },

  build: {
    target: "esnext",
  },
});