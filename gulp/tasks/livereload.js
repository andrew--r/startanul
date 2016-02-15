import browserSync from 'browser-sync';
import gulp        from 'gulp';
import gutil       from 'gulp-util';
import paths       from '../paths';

gulp.task('livereload', () => {
	browserSync.init({
		files: [`${paths.baseDist}/**/*`],
		open: !!gutil.env.open,
		reloadOnRestart: true,
		port: gutil.env.port || 3000,
		server: {
			baseDir: [
				`${paths.dist.images}`,
				`${paths.baseDist}`
			],
			directory: false
		},
		tunnel: !!gutil.env.tunnel
	})
});
