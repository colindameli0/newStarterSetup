var config = {
	jsConcatFiles: [
		'./app/js/module1.js', 
		'./app/js/main.js'
	], 
	buildFilesFoldersRemove:[
		'build/scss/', 
		'build/js/!(*.min.js)',
		'build/bower.json',
		'build/bower_components/',
		'build/maps/'
	]
};

//REQUIRED
var gulp    	 = require('gulp'),
	rename  	 = require('gulp-rename'),
	browserSync  = require('browser-sync'),
	reload       = browserSync.reload,
	sass    	 = require('gulp-sass'),
	concat       = require('gulp-concat'),
	imagemin     = require('gulp-imagemin'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'), 
	del          = require('del'),
    uglify  	 = require('gulp-uglify');
    

//LOG ERROR
function errorlog(err){
	console.log(err.message);
	this.emit('end');
}



//SCRIPTS TASK
gulp.task('scripts', function(){
	return gulp.src(config.jsConcatFiles)
		.pipe(concat('temp.js'))
		.pipe(uglify())
		.on('error', errorlog)
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('./app/js/'))

		.pipe(reload({stream:true})); 
});

//HTML TASK
gulp.task('html', function(){
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));
});

//BUILD TASK
//clear out all files and folders from build folder
gulp.task('build:clean', function(){
	return del([
		'build/**'
	]);
});

//Task to create build directory for all files
gulp.task('build:copy', ['build:clean'], function(){
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build/'));
});

//remove unwanted files
gulp.task('build:remove', ['build:copy'], function(cb){
	del(config.buildFilesFoldersRemove, cb);
});

gulp.task('build', ['build:copy', 'build:remove']);

//WATCH TASK
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/**/*.html', ['html']);
});

//SASS TASK
gulp.task('sass', function(){
	gulp.src('app/scss/style.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.on('error', errorlog)
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('app/css'))

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
});

//DEFAULT
gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);