import gulp  from 'gulp';
import paths from '../paths';

gulp.task('static', () => {
	return gulp
		.src(`${paths.src.static}/**/*`)
		.pipe(gulp.dest(paths.baseDist));
});