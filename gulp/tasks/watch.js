import gulp        from 'gulp';
import watch       from 'gulp-watch'; 
import runSequence from 'run-sequence';
import {reload}    from 'browser-sync';
import paths       from '../paths';
import error       from '../utils/errorHandler.js'

gulp.task('watch', () => {
	global.watch = true;

	watch(`${paths.baseSrc}/{styles,blocks,svg}/**/*.{styl,svg}`, () => {
		runSequence('styles', reload.bind(null, `${paths.dist.styles}/app.min.css`));
	});

	watch(`${paths.baseSrc}/{layouts,pages,blocks}/**/*.jade`, () => {
		runSequence('markup', reload);
	});

	watch(`${paths.src.static}/**/*`, () => {
		runSequence('static', reload);
	});

	watch(`${paths.src.scripts}/vendor/*.js`, () => {
		runSequence('scripts:copy', reload);
	});

	watch([`${paths.baseSrc}/{scripts,blocks}/**/*.js`, `!${paths.src.scripts}/vendor/*.js`], () => {
		runSequence('scripts:compile', reload);
	});
});