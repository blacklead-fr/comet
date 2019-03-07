'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var csslint = require( 'gulp-csslint' );
var eslint = require( 'gulp-eslint' );
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
const named = require('vinyl-named');

sass.compiler = require('node-sass');

gulp.task('css:compile', function(){
    return gulp.src(['src/css/admin/admin.scss', 'src/css/editor/editor.scss', 'src/css/utils/view.scss' ])
    .pipe(sourcemaps.init())
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write( '.' ))
    .pipe(gulp.dest('src/css/'));
});

gulp.task( 'css:watch', function(){
    gulp.watch( 'src/css/**/*.scss', [ 'css:compile' ] );
});

gulp.task( 'css:verify', function(){
    return gulp.src( [ 'src/css/*.css' ] )
    .pipe(csslint())
    .pipe(csslint.formatter());
});

gulp.task( 'js:verify', function(){

    return gulp.src( [ 'src/js/**/*.js', '!src/js/*js' ] )

    .pipe(eslint({
        'env': {
            'browser': true,
        },
        'parserOptions': {
            'ecmaVersion': 6,
            'sourceType': 'module',
            'ecmaFeatures': {
                'jsx': true
            }
        },
        'rules':{
            'eqeqeq': 'warn',
            'vars-on-top': 2,
            'quotes': [ 1, 'single' ],
            'semi': [ 'error', 'always'],
            'strict': 1,
            'no-use-before-define': 'off',
            'no-console': 2
        }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());

});


gulp.task( 'js:compile', function(){
	return gulp.src( [ 'src/js/editor/editor.js', 'src/js/utils/view.js', 'src/js/admin/admin.js' ] )
    .pipe( named() )
    .pipe( webpack( {
        //watch: true,
        target: 'web',
        mode: /*'production',*/'development',
        devtool: 'source-map',
    } ) )
    .pipe( gulp.dest( 'src/js/' ) );
} );

gulp.task( 'js:watch', function() {
  gulp.watch([ 'src/js/**/*.js' ], { delay: 60000 }, [ 'js:compile' ] );
});

gulp.task( 'default', [ 'css:verify', 'js:verify', 'css:compile', 'js:compile' ] );


