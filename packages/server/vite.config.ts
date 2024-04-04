import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import checker from "vite-plugin-checker"
import * as path from "node:path"
import { fileURLToPath } from 'url';
import * as ts from "typescript"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
function MyPlugin() {
    const plugin: Plugin = {
        name: "Plugin",
        config: () => {
            return {}
        },
        configureServer: async (server) => {
            server.middlewares.use("/api", async (req, res, next) => {
                const appModule = await (await server.ssrLoadModule("./src/index.tsx"))
                const app = appModule["viteNodeApp"]
                console.log("here")
                console.log(req.url)
                // Don't rewrite
                req.url = "/api" + req.url
                app(req, res, next)
            })
        }
    }
    return plugin
}

export default defineConfig({
    server: {
        port: 3000,
    },

    plugins: [
        MyPlugin(),
        checker({
            typescript: {
                tsconfigPath: path.join(__dirname, "../formatters/tsconfig.json"),
                extraTSOptions: {
                    emitDeclarationOnly: true,
                    noEmit: false
                }
            }
        })
        

    ],

    resolve: {
        alias: {
            "@local/formatters": path.join(__dirname, "../formatters/src/index.ts")
        }
    }



});