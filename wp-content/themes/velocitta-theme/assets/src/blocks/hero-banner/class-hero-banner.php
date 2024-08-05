<?php

/**
 * Registers the velocitta-theme/hero-banner block.
 *
 * @global array    $attrs   Block attributes passed to the render callback.
 * @global string   $content Block content from InnerBlocks passed to the render callback.
 * @global WP_Block $block   Block registration object.
 *
 * @package velocitta-theme
 */

namespace VELOCITTA_THEME\Blocks;

use VELOCITTA_THEME\Includes\Block_Base;
use WP_Block;

/**
 *  Class for the velocitta-theme/hero-banner block.
 */
class Hero_Banner extends Block_Base
{

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		$this->_block = 'hero-banner';
		$this->setup_hooks();
	}

	/**
	 * To register action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks()
	{
		add_filter('velocitta_theme_gutenberg_blocks_config', array($this, 'localize_block_data'));
	}

	/**
	 * Localize template data.
	 *
	 * @param array $blocks_config Block configuration.
	 * @return array Updated block configuration.
	 */
	public function localize_block_data(array $blocks_config): array
	{
		// Merge your block data into blocks_config.
		return array_merge(
			$blocks_config,
			array(
				'hero_banner_block_config' => array(
					'data_key' => 'data_value',
				),
			)
		);
	}

	/**
	 * Render block.
	 *
	 * @param array    $attributes   Block attributes.
	 * @param string   $content      Block content.
	 * @param WP_Block $block        Block object.
	 * @return string
	 */
	public function render_callback(
		// phpcs:disable VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
		array $attributes,
		string $content,
		WP_Block $block
		// phpcs:enable
	): string {

		// get string of attributes of the features that the block supports.
		$wrapper_attributes = get_block_wrapper_attributes();

		// attributes.
		$heading = isset($attributes['heading']) ? $attributes['heading'] : '';
		$headingColor = isset($attributes['headingColor']) ? $attributes['headingColor'] : '#051145';
		$backgroundimageURL = isset($attributes['backgroundimageURL']) ? $attributes['backgroundimageURL'] : '';
		$backgroundimageAlt = isset($attributes['backgroundimageAlt']) ? $attributes['backgroundimageAlt'] : '';
		$backgroundimageWidth = isset($attributes['backgroundimageWidth']) ? $attributes['backgroundimageWidth'] : '';
		$backgroundimageHeight = isset($attributes['backgroundimageHeight']) ? $attributes['backgroundimageHeight'] : '';
		$logoimageURL = isset($attributes['logoimageURL']) ? $attributes['logoimageURL'] : '';
		$logoimageAlt = isset($attributes['logoimageAlt']) ? $attributes['logoimageAlt'] : '';
		$logoimageWidth = isset($attributes['logoimageWidth']) ? $attributes['logoimageWidth'] : '';
		$logoimageHeight = isset($attributes['logoimageHeight']) ? $attributes['logoimageHeight'] : '';
		$headingVisibility = isset($attributes['headingVisibility']) ? $attributes['headingVisibility'] : '';
		$alignment = isset($attributes['alignment']) ? $attributes['alignment'] : '';

		ob_start();
?>
		<div class="hero-banner-main">
			<div class="logo-image">
				<?php if (!empty($logoimageURL)) : ?>
					<img width="<?php echo esc_attr($logoimageWidth); ?>" height="<?php echo esc_attr($logoimageHeight); ?>" src="<?php echo esc_url($logoimageURL); ?>" alt="<?php echo $logoimageAlt ? esc_attr($logoimageAlt) : 'Thumbnail'; ?>" />
				<?php endif; ?>
			</div>
			<div class="hero-banner-background" style="background-image:url('<?php echo $backgroundimageURL ?>');justify-content:<?php echo $alignment ?>">
				<?php if ($headingVisibility == true) { ?>
					<div class="hero-banner-heading">
						<?php if (!empty($heading)) : ?>
							<h1 style="color: <?php echo esc_attr($headingColor); ?>"><?php echo esc_html($heading); ?></h1>
						<?php endif; ?>
					</div>
				<?php } ?>
			</div>

		</div>
<?php
		return ob_get_clean();
	}
}
