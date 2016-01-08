//REQUIRED
var gulp    	 = require('gulp'),
	rename  	 = require('gulp-rename'),
	browserSync  = require('browser-sync'),
	reload       = browserSync.reload,
	sass    	 = require('gulp-sass'),
	imagemin     = require('gulp-imagemin'),
	cache        = require('gulp-cache'),
	plumber 	 = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'), 
	del          = require('del'),
    uglify  	 = require('gulp-uglify');
    
//SCRIPTS TASK
gulp.task('scripts', function(){
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(reload({stream:true})); 
});

//HTML TASK
gulp.task('html', function(){
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));
});

//WATCH TASK
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/**/*.html', ['html']);
});

//SASS TASK
gulp.task('sass', function(){
	gulp.src('app/scss/style.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('app/css/'))
		.pipe(reload({stream:true}));
});

//Browser-Sync
gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir: "./app/"
		}
	});
});

//IMAGE OPT
gulp.task('images', function(){
	gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/images'))
});

//DEFAULT
gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);