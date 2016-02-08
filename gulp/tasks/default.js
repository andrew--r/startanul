import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', () => (
	runSequence([
			'markup',
			'styles',
			'scripts'
		],
		'livereload',
		'watch'
	)
));
