const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs-promise');
const koaBody = require('koa-body');

const app = module.exports = new Koa();

app.use(koaBody({ multipart: true }));

app.use(async function(ctx) {
  // create a temporary folder to store files
  const tmpdir = path.join(os.tmpdir(), uid());

  // make the temporary directory
  await fs.mkdir(tmpdir);
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
});

if (!module.parent) app.listen(3000);

function uid() {
  return Math.random().toString(36).slice(2);
}