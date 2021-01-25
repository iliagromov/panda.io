const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const pug = require('gulp-pug');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);




function clear() {
	return del('build/*');
}

function html() {
	return gulp.src('./views/*.html')
		.pipe(gulp.dest('./build'))
		.pipe(gulpif(isSync, browserSync.stream()));
}

function pugc() {
	return gulp.src(['./views/**/*.pug'])
		.pipe(pug({ pretty: '\t' }))
		.pipe(gulp.dest('./build'))
		.pipe(gulpif(isSync, browserSync.stream()));
}

function pugProd(){
	return gulp.src(['./src/*.pug',])
		.pipe(pug({ pretty: '\t' }))
		.pipe(gulp.dest('./'))
		.pipe(gulpif(isSync, browserSync.stream()));
}



function watch() {
	if (isSync) {
		browserSync.init({
			server: {
				baseDir: "./build/",
			}
			// tunnel: true //использование локального сервера
		});
	}
	gulp.watch('./views/**/*.html', html);
	gulp.watch('./views/**/*.pug', pugc);
}


let build = gulp.series(clear,
	gulp.parallel(html, pugc)
);

gulp.task('build', gulp.series(build));
gulp.task('watch', gulp.series(build, watch));

gulp.task('pugProd', pugProd);