import express from "express";
import childProcess from "child_process";
import {renderToString} from "react-dom/server";
import router from "@/router";
import {Routes, Route} from "react-router-dom";
import {StaticRouter} from "react-router-dom/server";
import path from "path";
import {Helmet} from "react-helmet";
import {serverStore} from "@/store";
import {Provider} from "react-redux";

const app = express();

const bodyParser = require("body-parser");

app.use(express.static(path.resolve(process.cwd(), "client_build")));

// 请求body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 起一个post服务
app.post("/api/getDemoData", (req, res) => {
  res.send({
    data: req.body,
    status_code: 0,
  });
});

app.get("*", (req, res) => {
  const content = renderToString(
    <Provider store={serverStore}>
      <StaticRouter location={req.path}>
        <Routes>
          {router?.map((item, index) => {
            return <Route {...item} key={index} />;
          })}
        </Routes>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();
  res.send(`
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
       </body>
     </html>
  `);
});

app.listen(3000, () => {
  console.log("ssr-server listen on 3000");
});

// childProcess.exec("start http://127.0.0.1:3000");
