var gulp = require("gulp");  //gulp
var del = require('del'); //del
var babel = require("gulp-babel");  //ES6转ES5
var uglify = require('gulp-uglify');  //js压缩
var concat = require("gulp-concat");  //文件合并
var sass = require("gulp-sass");  //sass
var autoprefixer = require('gulp-autoprefixer');  //添加兼容前缀
var rev = require('gulp-rev');  //添加hash
var revCollector = require('gulp-rev-collector');
var rename = require('gulp-rename'); //重命名
var sourcemaps = require('gulp-sourcemaps'); //sourcemaps
var htmlmini = require('gulp-minify-html'); //压缩html
var csso = require('gulp-csso');  //优化css
var less = require("gulp-less");  //less
var zip = require('gulp-zip');  //zip压缩
var $ = require('gulp-load-plugins');  //
var  runSequence = require('run-sequence');
var livereload = require('gulp-livereload');			// 网页自动刷新（服务器控制客户端同步刷新）
var	webserver = require('gulp-webserver');  //server
var md5 = require("gulp-md5-plus"); 


gulp.task("del", function () { 
    del('./dist/css'); 
    console.log('del')
})

gulp.task('autofixer', () =>
    gulp.src('./css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 5 versions', '>1%', 'Android >= 3.2', 'Firefox >= 20', 'iOS 7'],
            cascade: true
        }))
        .pipe(gulp.dest('dist/css')),
        console.log('two')
);

gulp.task('cssmin', function(){
        gulp.src('./css/*.css')
            .pipe(csso())
            .pipe(gulp.dest('./dist/css')),
            console.log('cm')
    })

// gulp.task('default', ['del', 'rev', 'rev-name'], function() {
//     console.log('ot')
// });
//babel
gulp.task("jsbabel", function () {  
    return gulp.src('./js/*.js','!js/*.min.js')// ES6 源码存放的路径  
        .pipe(babel({  
            presets: ['es2015']  
        }))  
        .pipe(gulp.dest("dist/js")); //转换成 ES5 存放的路径  
});  


//uglify
gulp.task('compass', function () {
    gulp.src(['./js/*.js','!js/*.min.js'])  //获取文件，同时过滤掉.min.js文件
        .pipe(uglify())
        .pipe(gulp.dest('javascript/'));  //输出文件
});


//concat
gulp.task('concat', function () {
    gulp.src('./js/*.js','!js/*.min.js')  //要合并的文件
    .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
    .pipe(gulp.dest('dist/js'));
});



//autoprefixer
gulp.task('cssfixer', () =>
    gulp.src('./css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 5 versions', '>1%', 'Android >= 3.2', 'Firefox >= 20', 'iOS 7'],
            cascade: true
        }))
        .pipe(gulp.dest('dist/css'))
);

//sass
gulp.task('css-sass', function () {
    gulp.src('./css/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 5 versions', '>1%', 'Android >= 3.2', 'Firefox >= 20', 'iOS 7'],
        cascade: true
    }))
    .pipe(gulp.dest('dist/csss'));
});



//less
gulp.task('compile-less', function () {
    gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});


//csso
gulp.task('cssmin', function(){
    gulp.src('./css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'))
})

//imagemin
gulp.task('imagmin', () =>
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

//htmlmini
gulp.task('htmlmini', function () {
    gulp.src('./src/*.html')
        .pipe(htmlmini())
        .pipe(gulp.dest('minihtml'));
})

//hash
gulp.task('hash', function () {
    gulp.src('./css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./dist/css'))
})

//allzip
gulp.task('allzip', function () {
    gulp.src('./src/*')
        .pipe(zip('all.zip'))                   // 压缩成all.zip文件
        .pipe(gulp.dest('./dist/zip'))
})

gulp.task('rev', function(){
gulp.src('./css/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./dist/css'))
})



gulp.task('CSS', () =>
    gulp.src('src/*.css')
        //.pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '>1%', 'Android >= 3.2', 'Firefox >= 20', 'iOS 7'], //设置兼容版本
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            //remove:true //是否去掉不必要的前缀 默认：true
        }))
        //.pipe(concat('all.css'))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
);