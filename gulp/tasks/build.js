import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', ['clean'], () => {
	runSequence([
			'markup',
			'styles',
			'scripts:compile',
			'scripts:copy',
			'static',
		],
		'zip'
	);
});