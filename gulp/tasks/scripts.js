import gulp         from 'gulp';
import uglify       from 'gulp-uglify';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import browserify   from 'browserify';
import babel        from 'babelify';
import errorHandler from '../utils/errorHandler';
import paths        from '../paths';

gulp.task('scripts:compile', () => {
	let bundler = browserify(`${paths.src.scripts}/main.js`, { debug: true }).transform(babel);
	return bundler
		.bundle()
		.on('error', function(err) { console.error(err); this.emit('end'); })
		.pipe(source('build.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist.scripts));
});

gulp.task('scripts:copy', () => {
	return gulp
		.src(`${paths.src.scripts}/vendor/*.js`)
		.pipe(uglify())
		.pipe(gulp.dest(`${paths.dist.scripts}/vendor`));
});