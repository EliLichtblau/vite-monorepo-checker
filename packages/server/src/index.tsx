import express from "express"
import * as React from "react"
import * as ReactDOM from "react-dom/server"
import {Example, AnotherFunction} from "@local/formatters"
const app = express()

function Render({children}: {children: JSX.Element | JSX.Element[]}) {
    return <html>
        <head>
            <script type="module" src="http://localhost:3000/@vite/client"></script>
        </head>
        <body>
            {children}
        </body>
    </html>
}

app.get("/api/hello", (req, res)=>{
    
    res.send(ReactDOM.renderToString(<Render>
        <div>Hello world change {Example()} {AnotherFunction()} </div>
    </Render>))
})

export const viteNodeApp = app;
