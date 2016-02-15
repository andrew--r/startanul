import gulp       from 'gulp';
import del        from 'del';
import vinylPaths from 'vinyl-paths';
import paths      from '../paths';

gulp.task('clean', () => {
	return gulp
		.src(`${paths.baseDist}/*`)
		.pipe(vinylPaths(del));
});