<?php

/**
 * Registers the velocitta-theme/benfits-card block.
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
 *  Class for the velocitta-theme/benfits-card block.
 */
class Benfits_Card extends Block_Base
{

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		$this->_block = 'benfits-card';
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
				'benfits-card_block_config' => array(
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
		$cardtextalignment = isset($attributes['cardtextalignment']) ? $attributes['cardtextalignment'] : '';
		$dataArray = isset($attributes['dataArray']) ? $attributes['dataArray'] : '';
		$benfitsbackgroundColor = isset($attributes['benfitsbackgroundColor']) ? $attributes['benfitsbackgroundColor'] : '#051145';
		$topheadingColor = isset($attributes['topheadingColor']) ? $attributes['topheadingColor'] : '#051145';
		$benfitsheadingColor = isset($attributes['benfitsheadingColor']) ? $attributes['benfitsheadingColor'] : '#051145';
		$benfitscontentColor = isset($attributes['benfitscontentColor']) ? $attributes['benfitscontentColor'] : '#051145';
		$showImage = isset($attributes['showImage']) ? $attributes['showImage'] : '';
		$showTitle = isset($attributes['showTitle']) ? $attributes['showTitle'] : '';
		$showDescription = isset($attributes['showDescription']) ? $attributes['showDescription'] : '';
		$showmainHeading = isset($attributes['showmainHeading']) ? $attributes['showmainHeading'] : '';
		ob_start();
?>
		<div class="benefits_card_body" style="background-color: <?php echo esc_attr($benfitsbackgroundColor); ?>">
			<div class="container">
				<?php if ($showTitle == true) { ?>
					<div class="heading" style="text-align: <?php echo $cardtextalignment ?>">
						<?php if (!empty($heading)) : ?>
							<h2 style="color: <?php echo esc_attr($topheadingColor); ?>"><?php echo esc_html($heading); ?></h2>
						<?php endif; ?>
					<?php } ?>
					</div>

					<div class="benfits-card-main">
						<div class="benfits-card-inner">
							<?php if (!empty($dataArray)) {
								foreach ($dataArray as $data) {
							?>
									<div class="benifits-card-section">
										<div class="benifits-card-container">
											<?php if ($showImage == true) { ?>
												<div class="benfits-image-section">
													<?php if (!empty($data['media'])) {
													?>
														<img src="<?php echo esc_url($data['media']); ?>" />
													<?php
													}
													?>
												</div>
											<?php } ?>

											<div class="benfits-card-right-section">
												<?php if (!empty($data['benfitscardHeding'])) {

													if ($showmainHeading == true) { ?>

														<h3 style="color: <?php echo esc_attr($benfitsheadingColor); ?>"><?php echo esc_html($data['benfitscardHeding']); ?></h3>
												<?php
													}
												}
												?>
												<?php if ($showDescription == true) { ?>
													<?php if (!empty($data['benfitscardContent'])) {
													?>
														<p style="color: <?php echo esc_attr($benfitscontentColor); ?>"><?php echo esc_html($data['benfitscardContent']); ?></p>


												<?php
													}
												}
												?>
											</div>

										</div>
									</div>
							<?php
								}
							}
							?>
						</div>
					</div>
			</div>
		</div>
<?php
		return ob_get_clean();
	}
}
