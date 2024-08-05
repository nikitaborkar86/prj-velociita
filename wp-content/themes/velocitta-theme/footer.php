<?php

/**
 * The template for displaying the footer
 *
 * @package velocitta-theme
 */

?>

<footer id="colophon" class="site-footer  u-flex u-justify-content-center u-padding-a30">
	<div class="site-info u-primary-text-color">
		<a class="u-link-text-color" href="<?php echo esc_url(__('https://www.multidots.com/', 'velocitta-theme')); ?>">
			<?php
			/* translators: %s: CMS name, i.e. WordPress. */
			printf(esc_html__('Proudly powered by %s', 'velocitta-theme'), 'WordPress');
			?>
		</a>
		<span class="sep"> | Theme : Velocity</span>
		<a class="u-link-text-color" href="">velocitta.com</a>
	</div><!-- .site-info -->
</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>