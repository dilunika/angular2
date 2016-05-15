var gulp = require('gulp');

var PATHS = {
    app: 'app/**/*.ts'
};

var dist = 'dist';

gulp.task('clean', function (done) {
   
   var del = require('del');
   del([dist], done);
    
});

gulp.task('ts2js',['clean'],function () {
    var typescript = require('gulp-typescript');
    var tsconfig = require('./tsconfig.json');
    
    var tsresults = gulp
                        .src([PATHS.app, 'node_modules/angular2/typings/browser.d.ts'])
                        .pipe(typescript(tsconfig.compilerOptions));
                        
    return tsresults.js.pipe(gulp.dest(dist));
});

gulp.task('run', ['ts2js'], function () {
    
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.app, ['ts2js']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
})

