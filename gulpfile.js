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

    return gulp.src( [ 'src/js/**/*.js', '!src/js/*js', '!src/js/utils/viewport.js', '!src/js/utils/ui/viewport.js', '!src/js/utils/book.js' ] )

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
        'rules': {
            'eqeqeq': 'warn',
            'vars-on-top': 'error',
            'quotes': [ 'warn', 'single' ],
            'semi': [ 'error', 'always'],
            'no-extra-semi': 'error',
            'semi-spacing': 'warn',
            'strict': 'warn',
            'no-use-before-define': 'off',
            'no-console': 'warn',
            'no-new-func': 'warn',
            'no-new-wrappers': 'error',
            'no-func-assign': 'error',
            'no-shadow': [ 'error', { 'builtinGlobals': true, 'hoist': 'all' } ],
            'no-useless-escape': 'error',
            'no-useless-return': 'error',
            'yoda': 'error',
            'no-new-object': 'error',
            'no-invalid-regexp': 'error',
            'no-dupe-keys': 'error',
            'no-duplicate-case': 'error',
            'no-empty': 'error',
            'no-invalid-regexp': 'error',
            'no-empty-function': 'error',
            'no-fallthrough': 'error',
            'no-redeclare': 'error',
            'no-delete-var': 'error',
            'no-label-var': 'error',
            'no-undef': 'error',
            'no-unused-vars': 'error',
            'no-self-assign': 'error',
            'no-octal': 'error',
            'valid-typeof': [ 'error', { 'requireStringLiterals': true } ],
            'no-unreachable': 'error',
            'no-unexpected-multiline': 'error',
            'no-sparse-arrays': 'error',
            'no-regex-spaces': 'error',
            'no-control-regex': 'error',
            'no-obj-calls': 'error',
            'no-inner-declarations': 'warn',
        }
    }))
    .pipe(eslint.format())
    //.pipe(eslint.failOnError());

});


gulp.task( 'js:compile', function(){
	return gulp.src( [ 'src/js/editor/editor.js', 'src/js/utils/view.js', 'src/js/admin/admin.js' ] )
    .pipe( named() )
    .pipe( webpack( {
        //watch: true,
        target: 'web',
        mode: 'production',/*'development',*/
        devtool: 'source-map',
    } ) )
    .pipe( gulp.dest( 'src/js/' ) );
} );

gulp.task( 'js:watch', function() {
  gulp.watch([ 'src/js/**/*.js' ], { delay: 60000 }, [ 'js:compile' ] );
});

gulp.task( 'default', [ 'css:verify', 'js:verify', 'css:compile', 'js:compile' ] );


