var gulp = require("gulp");  //gulp
// var $ = require('gulp-load-plugins');  //
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
var imagemin = require('gulp-imagemin');
var htmlmini = require('gulp-minify-html'); //压缩html
var base64 = require('gulp-base64');
var csso = require('gulp-csso');  //优化css
var less = require("gulp-less");  //less
var useref = require("gulp-useref");
var zip = require('gulp-zip');  //zip压缩
var  runSequence = require('run-sequence');  //
var livereload = require('gulp-livereload');			// 网页自动刷新（服务器控制客户端同步刷新）
var	webserver = require('gulp-webserver');  //server
// var	connect = require('gulp-connect');
var markdown = require('gulp-markdown');


//
gulp.task("del", function () { 
    del('./dist/*');
})

gulp.task('base64', () =>{
    gulp.src('./css/*.css')
        .pipe(base64({
            maxImageSize: 8*1024,               // 只转8kb以下的图片为base64
        }))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('md', () =>{
	gulp.src('./src/*.md')
		.pipe(markdown())
		.pipe(gulp.dest('./dist/md'))
});


gulp.task('refhtml', function () {
    return gulp.src('./src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
});


//js
gulp.task("jsplugin", () => {  
    return gulp.src(['./src/js/*.js','!./js/*.min.js'])// ES6 源码存放的路径  
        // .pipe(sourcemaps.init())
        .pipe(babel({  
            presets: ['es2015']  //es6转es5
        }))
        .pipe(rev())
        //.pipe(concat('fhxy.main.js'))  // 合并匹配到的js文件并命名为 "all.js"
        .pipe(uglify({ mangle: { toplevel: true }})) //这个是简单混淆 就是变量变成单个字母
        // .pipe(uglify())    
        // .pipe(sourcemaps.write('../maps/js/', {addComment: false}))  //addComment : true / false ; 是控制处理后的文件（本例是 all.js ），尾部是否显示关于sourcemaps信息的注释。 不加这个属性，默认是true。设置为false的话，就是不显示。
        .pipe(gulp.dest("./dist/js")) //转换成 ES5 存放的路径  
        .pipe( rev.manifest() )
        .pipe( gulp.dest( './dist/rev/js' ) )
});  


gulp.task("watchjs", () => {  
    return gulp.src(['./src/js/*.js','!./js/*.min.js'])// ES6 源码存放的路径  
        .pipe(sourcemaps.init())
        .pipe(babel({  
            presets: ['es2015']  //es6转es5
        }))
        // .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps/js/', {addComment: false}))  //addComment : true / false ; 是控制处理后的文件（本例是 all.js ），尾部是否显示关于sourcemaps信息的注释。 不加这个属性，默认是true。设置为false的话，就是不显示。
        .pipe(gulp.dest("./dist/js")) //转换成 ES5 存放的路径  
});  




//css
gulp.task('cssplugin', () =>{
    return gulp.src(['./src/css/*.scss', './src/css/*.css', '！./src/css/*.min.css'])
        //  .pipe(sourcemaps.init())
         .pipe(sass())
         //.pipe(less())
         .pipe(autoprefixer({
            browsers: ['last 2 versions'], //设置兼容版本
            cascade: true //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            //remove:true //是否去掉不必要的前缀 默认：true
        }))
        // .pipe(concat('all.css'))
        .pipe(rev())
        .pipe(csso())
        // .pipe(sourcemaps.write('../maps/css/', {addComment: false}))
        .pipe(gulp.dest('./dist/css'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( './dist/rev/css' ) )
});

gulp.task('watchcss', () =>{
    return gulp.src(['./src/css/*.scss', './src/css/*.css', '！./src/css/*.min.css'])
         .pipe(sourcemaps.init())
         .pipe(sass())
         .pipe(autoprefixer({
            browsers: ['last 2 versions'], //设置兼容版本
            cascade: true //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            //remove:true //是否去掉不必要的前缀 默认：true
        }))
        // .pipe(concat('all.css'))
        .pipe(csso())
        .pipe(sourcemaps.write('../maps/css/', {addComment: false}))
        .pipe(gulp.dest('./dist/css'))
});



//imagemin
gulp.task('imagmin', () =>{
    return  gulp.src('./src/images/*.{png,jpg,gif,svg}')
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
            .pipe(gulp.dest('./dist/images'))
});


gulp.task('renamestring', ()=>{
    return  gulp.src("./src/hello.txt")
            .pipe(rename("main/text/ciao/goodbye.md"))
            .pipe(gulp.dest("./dist"))
})

gulp.task('renamefunction', () =>{
    return   gulp.src('./src/*.html')
            .pipe(rename(function (path) {
                path.dirname += "/ciao";
                path.basename = "goodbye";
                path.extname = ".md"
            }))
            .pipe(gulp.dest("./dist"));
})

gulp.task('renamehash', () =>{
    return  gulp.src("./src/index.html", { base: process.cwd() })
            .pipe(rename({
                dirname: "",
                basename: "aloha",
                prefix: "bonjour-",
                suffix: "-hola",
                extname: ".md"
            }))
            .pipe(gulp.dest("./dist"));
})


gulp.task('htmlrev', () => {
    return gulp.src(['./dist/rev/**/*.json', './src/*.html'])
            .pipe( revCollector({
                replaceReved: true,
                dirReplacements: {
                    'css': 'dist/css',
                    'js': 'dist/js',
                    'cdn/': function(manifest_value) {
                        return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                    }
                }
            }))
            .pipe(gulp.dest('./dist'))
})
// //htmlmini
gulp.task('htmlmini', function () {
    gulp.src('./src/*.html')
        .pipe(htmlmini())
        .pipe(gulp.dest('minihtml'));
})


//allzip
gulp.task('allzip', function () {
    gulp.src('./src/*')
        .pipe(zip('all.zip'))                   // 压缩成all.zip文件
        .pipe(gulp.dest('./dist/zip'))
})


gulp.task('webserver', function() {
    gulp.src( './dist/' ) // 服务器目录（.代表根目录）
    .pipe(webserver({ // 运行gulp-webserver
    //   host: '0.0.0.0',
      port: 800,
      livereload: true // 启用LiveReload
      //open: true // 服务器启动时自动打开网页
    }));
  });
  
  // 监听任务
gulp.task('watch',function(){
    // 监听 html
    gulp.watch('src/*.html', ['refhtml'])
    // 监听 scs
    gulp.watch('src/scss/*.scss', ['watchcss'])
    // 监听 images
    gulp.watch('src/images/*.{png,jpg,gif,svg}', ['imagmin'])
    // 监听 js
    gulp.watch('src/js/*.js', ['watchjs'])
    
  });
   
  gulp.task('dev', ()=>{
    runSequence('del', ['watchcss', 'watchjs', 'imagmin'], 'refhtml',['webserver','watch'], ()=>{
       // console.log('finish')
    });
})

  // 默认任务
//   gulp.task('dev',['webserver','watch']);


// gulp.task('default', ['del', 'copyhtml', 'jsplugin', 'cssplugin', 'imagmin', 'htmlrev'], () => {
//     console.log('ot')
// });
gulp.task('build', ()=>{
    runSequence('del', ['jsplugin', 'cssplugin', 'imagmin'], 'htmlrev', ()=>{
       console.log('Build finish')
    });
})
