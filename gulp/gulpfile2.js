var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    csslint = require('gulp-csslint'),
    rev = require('gulp-rev'),
    minifyCss = require('gulp-minify-css'),
    changed = require('gulp-changed'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    revCollector = require('gulp-rev-collector'),
    minifyHtml = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del');


var cssSrc = ['main.less', 'layer-box.less', 'tag.less'],
    cssDest = 'dist/css',
    jsSrc = 'src/js/*.js',
    jsDest = 'dist/js',
    fontSrc = 'src/fonts/*',
    fontDest = 'dist/font',
    imgSrc = 'src/img/*',
    imgDest = 'dist/img',
    cssRevSrc = 'src/css/revCss',
    condition = true;

function changePath(basePath){
    var nowCssSrc = [];
    for (var i = 0; i < cssSrc.length; i++) {
        nowCssSrc.push(cssRevSrc + '/' + cssSrc[i]);
    }
    return nowCssSrc;
}

//Fonts & Images 根据MD5获取版本号
gulp.task('revFont', function(){
    return gulp.src(fontSrc)
        .pipe(rev())
        .pipe(gulp.dest(fontDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/font'));
});
gulp.task('revImg', function(){
    return gulp.src(imgSrc)
        .pipe(rev())
        .pipe(gulp.dest(imgDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/img'));
});

//检测JS
gulp.task('lintJs', function(){
    return gulp.src(jsSrc)
        //.pipe(jscs())   //检测JS风格
        .pipe(jshint({
            "undef": false,
            "unused": false
        }))
        //.pipe(jshint.reporter('default'))  //错误默认提示
        .pipe(jshint.reporter(stylish))   //高亮提示
        .pipe(jshint.reporter('fail'));
});

//压缩JS/生成版本号
gulp.task('miniJs', function(){
    return gulp.src(jsSrc)
        .pipe(gulpif(
            condition, uglify()
        ))
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/js'));
});

//CSS里更新引入文件版本号
gulp.task('revCollectorCss', function () {
    return gulp.src(['src/rev/**/*.json', 'src/css/*.less'])
        .pipe(revCollector())
        .pipe(gulp.dest(cssRevSrc));
});

//检测CSS
gulp.task('lintCss', function(){
    return gulp.src(cssSrc)
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(csslint.failReporter());
});


//压缩/合并CSS/生成版本号
gulp.task('miniCss', function(){
    return gulp.src(changePath(cssRevSrc))
        .pipe(less())
        .pipe(gulpif(
            condition, minifyCss({
                compatibility: 'ie7'
            })
        ))
        .pipe(rev())
        .pipe(gulpif(
                condition, changed(cssDest)
        ))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            remove: false       
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/css'));
});

//压缩Html/更新引入文件版本
gulp.task('miniHtml', function () {
    return gulp.src(['src/rev/**/*.json', 'src/*.html'])
        .pipe(revCollector())
        .pipe(gulpif(
            condition, minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            })
        ))
        .pipe(gulp.dest('dist'));
});

gulp.task('delRevCss', function(){
    del([cssRevSrc,cssRevSrc.replace('src/', 'dist/')]);    
})

//意外出错？清除缓存文件
gulp.task('clean', function(){
    del([cssRevSrc ,cssRevSrc.replace('src/', 'dist/')]);
})

//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
         ['revFont', 'revImg'],
         ['lintJs'],
         ['revCollectorCss'],
         ['miniCss', 'miniJs'],
         ['miniHtml', 'delRevCss'],
    done);
});

//正式构建
gulp.task('build', function (done) {
    runSequence(
         ['revFont', 'revImg'],
         ['lintJs'],
         ['revCollectorCss'],
         ['miniCss', 'miniJs'],
         ['miniHtml', 'delRevCss'],
    done);
});


gulp.task('default', ['build']);


//目录结构
── package.json
├── gulpfile.js
├── src/
│   ├── css/
│   │   ├── main.less
│   │   └── normalize.less
│   ├── js/
│   │   ├── xx.js
│   │   └── xx.js
│   ├── img/
│   │   ├── xx.jpg
│   │   └── xx.png
│   ├── fonts/
│   │   ├── xx.svg
│   │   └── xx.ttf
│   ├── rev/
│   ├── index.html  


//package.json配置

{
    "devDependencies": {
      "apache-server-configs": "2.14.0",
      "archiver": "^0.14.3",
      "del": "^1.1.1",
      "glob": "^5.0.5",
      "gulp": "^3.8.11",
      "gulp-autoprefixer": "^2.1.0",
      "gulp-changed": "^1.2.1",
      "gulp-csslint": "^0.1.5",
      "gulp-header": "^1.2.2",
      "gulp-if": "^1.2.5",
      "gulp-jshint": "^1.11.2",
      "gulp-less": "^3.0.3",
      "gulp-load-plugins": "^0.10.0",
      "gulp-minify-css": "^1.2.0",
      "gulp-minify-html": "^1.0.4",
      "gulp-rev": "^5.1.0",
      "gulp-rev-collector": "^1.0.0",
      "gulp-uglify": "^1.2.0",
      "gulp-util": "^3.0.6",
      "jquery": "1.11.3",
      "jshint": "^2.8.0",
      "jshint-stylish": "^2.0.1",
      "mocha": "^2.2.4",
      "normalize.css": "3.0.3",
      "run-sequence": "^1.0.2"
    },
    "engines": {
      "node": ">=0.10.0"
    },
    "h5bp-configs": {
      "directories": {
        "archive": "archive",
        "dist": "dist",
        "src": "src",
        "test": "test"
      }
    },
    "homepage": "",
    "license": {
      "type": "MIT",
      "url": ""
    },
    "name": "gulp-auto-version",
    "private": true,
    "scripts": {
      "build": "gulp build",
      "test": ""
    },
    "version": "1.0.0",
    "dependencies": {}
  }