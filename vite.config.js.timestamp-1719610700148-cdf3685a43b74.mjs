// vite.config.js
import { defineConfig } from "file:///D:/Users/vrivero/Documents/muro-de-politicos/node_modules/vite/dist/node/index.js";
import laravel from "file:///D:/Users/vrivero/Documents/muro-de-politicos/node_modules/laravel-vite-plugin/dist/index.js";
import vue from "file:///D:/Users/vrivero/Documents/muro-de-politicos/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vuetify from "file:///D:/Users/vrivero/Documents/muro-de-politicos/node_modules/vite-plugin-vuetify/dist/index.mjs";
import AutoImport from "file:///D:/Users/vrivero/Documents/muro-de-politicos/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_dirname = "D:\\Users\\vrivero\\Documents\\muro-de-politicos";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.js"],
      refresh: true
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false
        }
      }
    }),
    vuetify({
      styles: {
        configFile: "resources/js/src/styles/variables/_vuetify.scss"
      }
    }),
    AutoImport({
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json"
      },
      imports: ["vue", "vue-router"],
      vueTemplate: true
    })
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@/": __vite_injected_original_dirname + "/resources/js/src/",
      "vue": "vue/dist/vue.esm-bundler.js",
      "@core": __vite_injected_original_dirname + "/resources/js/src/@core",
      "@layouts": __vite_injected_original_dirname + "/resources/js/src/@layouts",
      "@images": __vite_injected_original_dirname + "/resources/js/src/assets/images/",
      "@styles": __vite_injected_original_dirname + "/resources/js/src/styles",
      "@configured-variables": __vite_injected_original_dirname + "/resources/js/src/styles/variables/_template.scss",
      "@axios": __vite_injected_original_dirname + "/resources/js/src/plugins/axios"
    }
  },
  base: "/"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFx2cml2ZXJvXFxcXERvY3VtZW50c1xcXFxtdXJvLWRlLXBvbGl0aWNvc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVXNlcnNcXFxcdnJpdmVyb1xcXFxEb2N1bWVudHNcXFxcbXVyby1kZS1wb2xpdGljb3NcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1VzZXJzL3ZyaXZlcm8vRG9jdW1lbnRzL211cm8tZGUtcG9saXRpY29zL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgbGFyYXZlbCBmcm9tICdsYXJhdmVsLXZpdGUtcGx1Z2luJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB2dWV0aWZ5IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZXRpZnknXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgbGFyYXZlbCh7XG4gICAgICAgICAgICBpbnB1dDogWydyZXNvdXJjZXMvY3NzL2FwcC5jc3MnLCAncmVzb3VyY2VzL2pzL2FwcC5qcyddLFxuICAgICAgICAgICAgcmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIHZ1ZSh7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybUFzc2V0VXJsczoge1xuICAgICAgICAgICAgICAgICAgICBiYXNlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlQWJzb2x1dGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdnVldGlmeSh7XG4gICAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICAgICBjb25maWdGaWxlOiAncmVzb3VyY2VzL2pzL3NyYy9zdHlsZXMvdmFyaWFibGVzL192dWV0aWZ5LnNjc3MnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJ10sXG4gICAgICAgICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICBkZWZpbmU6IHsgJ3Byb2Nlc3MuZW52Jzoge30gfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQC8nOiBfX2Rpcm5hbWUgKyAnL3Jlc291cmNlcy9qcy9zcmMvJyxcbiAgICAgICAgICAgICd2dWUnOiAndnVlL2Rpc3QvdnVlLmVzbS1idW5kbGVyLmpzJyxcbiAgICAgICAgICAgICdAY29yZSc6ICBfX2Rpcm5hbWUgKyAnL3Jlc291cmNlcy9qcy9zcmMvQGNvcmUnLFxuICAgICAgICAgICAgJ0BsYXlvdXRzJzogIF9fZGlybmFtZSArICcvcmVzb3VyY2VzL2pzL3NyYy9AbGF5b3V0cycsXG4gICAgICAgICAgICAnQGltYWdlcyc6ICBfX2Rpcm5hbWUgKyAnL3Jlc291cmNlcy9qcy9zcmMvYXNzZXRzL2ltYWdlcy8nLFxuICAgICAgICAgICAgJ0BzdHlsZXMnOiBfX2Rpcm5hbWUgKyAnL3Jlc291cmNlcy9qcy9zcmMvc3R5bGVzJyxcbiAgICAgICAgICAgICdAY29uZmlndXJlZC12YXJpYWJsZXMnOiBfX2Rpcm5hbWUgKyAnL3Jlc291cmNlcy9qcy9zcmMvc3R5bGVzL3ZhcmlhYmxlcy9fdGVtcGxhdGUuc2NzcycsIFxuICAgICAgICAgICAgJ0BheGlvcyc6X19kaXJuYW1lICsgJy9yZXNvdXJjZXMvanMvc3JjL3BsdWdpbnMvYXhpb3MnLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBiYXNlOiAnLycsXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1UsU0FBUyxvQkFBb0I7QUFDN1YsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sU0FBUztBQUNoQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxnQkFBZ0I7QUFKdkIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ0osT0FBTyxDQUFDLHlCQUF5QixxQkFBcUI7QUFBQSxNQUN0RCxTQUFTO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDTixvQkFBb0I7QUFBQSxVQUNoQixNQUFNO0FBQUEsVUFDTixpQkFBaUI7QUFBQSxRQUNyQjtBQUFBLE1BQ0o7QUFBQSxJQUNKLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNKLFFBQVE7QUFBQSxRQUNKLFlBQVk7QUFBQSxNQUNoQjtBQUFBLElBQ0osQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsVUFBVTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsVUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUNBLFNBQVMsQ0FBQyxPQUFPLFlBQVk7QUFBQSxNQUM3QixhQUFhO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFFBQVEsRUFBRSxlQUFlLENBQUMsRUFBRTtBQUFBLEVBQzVCLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILE1BQU0sbUNBQVk7QUFBQSxNQUNsQixPQUFPO0FBQUEsTUFDUCxTQUFVLG1DQUFZO0FBQUEsTUFDdEIsWUFBYSxtQ0FBWTtBQUFBLE1BQ3pCLFdBQVksbUNBQVk7QUFBQSxNQUN4QixXQUFXLG1DQUFZO0FBQUEsTUFDdkIseUJBQXlCLG1DQUFZO0FBQUEsTUFDckMsVUFBUyxtQ0FBWTtBQUFBLElBQ3pCO0FBQUEsRUFDSjtBQUFBLEVBRUEsTUFBTTtBQUNWLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
