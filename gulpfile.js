'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var css = require( 'gulp-clean-css' );
var csslint = require( 'gulp-csslint' );
var eslint = require( 'gulp-eslint' );
var pump = require('pump');
var sass = require('gulp-sass');
const named = require('vinyl-named');

sass.compiler = require('node-sass');
 
gulp.task('css:compile', function(){
  return gulp.src(['src/css/admin/admin.scss', 'src/css/editor/editor.scss', 'src/css/utils/view.scss' ])
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src/css/'));
});
 
gulp.task('css:watch', function(){
  gulp.watch('src/css/**/*.scss', ['css:compile']);
});

 
gulp.task('css:verify', function(){
	return gulp.src( ['src/css/**/*.css', '!src/css/**/*.min.css' ])
		.pipe(csslint())
    	.pipe(csslint.formatter());
});

gulp.task('js:verify', function(){
	return gulp.src(['src/js/**/*.js','!src/js/**/*.min.js'])
		.pipe(eslint({
        globals: [
            'jQuery',
            '$'
        ],
        envs: [
            'browser'
        ]
    }))
    .pipe(eslint.formatEach('compact', process.stderr));

});


gulp.task( 'js:compile', function(){
	return gulp.src( ['src/js/editor/editor.js', 'src/js/utils/view.js', 'src/js/admin/admin.js' ] )
    .pipe( named() )
    .pipe( webpack( {
        //watch: true,
        target: 'web',
    	mode: /*'production',*/'development',
        devtool: 'source-map',
    } ) )
    .pipe(gulp.dest('src/js/') );
} );

 
gulp.task('js:compress', function(cb){
	pump([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('src/js')
    ],
    cb
  );
});

gulp.task('css:compress', function(){
	return gulp.src('src/css/*.css')
    	.pipe(cleanCSS({compatibility: 'ie8'}))
    	.pipe(gulp.dest('src/css'));
});

gulp.task( 'default', [ 'css:verify', 'js:verify', 'css:compile', 'js:compile', 'css:compress', 'js:compress' ] );


