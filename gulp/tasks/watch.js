import gulp        from 'gulp';
import runSequence from 'run-sequence';
import { reload }  from 'browser-sync';
import paths       from '../paths';

gulp.task('watch', () => {
	global.watch = true;

	gulp.watch(`${paths.baseSrc}/{styles,blocks}/**/*.styl`, ['styles', () => reload(`${paths.dist.styles}/app.min.css`)]);
	gulp.watch(`${paths.baseSrc}/{pages,blocks}/**/*.jade`, () => runSequence('markup', reload));
	gulp.watch(`${paths.src.scripts}/**/*.js`, () => runSequence('scripts', reload));
});
