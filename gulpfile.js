const { src, dest, parallel } = require("gulp");
const gulpAutoPrefixer = require("gulp-autoprefixer");

function prepareCSS() {
    return src("styles/main.css").pipe(gulpAutoPrefixer())
        .pipe(src("node_modules/bootstrap/dist/css/*.min.css"))
        .pipe(dest("dist"));
}

exports.default = parallel(prepareCSS);