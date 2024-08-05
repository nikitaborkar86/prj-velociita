<?php

/**
 * Registers the velocitta-theme/sample-dynamic block.
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
 *  Class for the velocitta-theme/sample-dynamic block.
 */
class Solutions_Card extends Block_Base
{

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		$this->_block = 'solutions-card';
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
				'sample_dynamic_block_config' => array(
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



		// attributes.
		$heading = isset($attributes['heading']) ? $attributes['heading'] : '';
		$dataArray = isset($attributes['dataArray']) ? $attributes['dataArray'] : '';
		$headingColor = isset($attributes['headingColor']) ? $attributes['headingColor'] : '#051145';
		$cardheadingColor = isset($attributes['cardheadingColor']) ? $attributes['cardheadingColor'] : '#051145';
		$cardcontentColor = isset($attributes['cardcontentColor']) ? $attributes['cardcontentColor'] : '#051145';
		$buttontextColor = isset($attributes['buttontextColor']) ? $attributes['buttontextColor'] : '#051145';
		$imagebackgroundColor = isset($attributes['imagebackgroundColor']) ? $attributes['imagebackgroundColor'] : '#051145';
		$showsolutionImage = isset($attributes['showsolutionImage']) ? $attributes['showsolutionImage'] : '';
		$showsolutionTitle = isset($attributes['showsolutionTitle']) ? $attributes['showsolutionTitle'] : '';
		$showmainHeading = isset($attributes['showmainHeading']) ? $attributes['showmainHeading'] : '';
		$showsolutionDescription = isset($attributes['showsolutionDescription']) ? $attributes['showsolutionDescription'] : '';
		$showsolutionButton = isset($attributes['showsolutionButton']) ? $attributes['showsolutionButton'] : '';
		$textAlignment = isset($attributes['textalignment']) ? $attributes['textalignment'] : '';
		ob_start();
?>
		<div class="solutions-card-main">
			<div class="container">
				<?php if ($showmainHeading == true) { ?>
					<?php if (!empty($heading)) : ?>
						<h1 style="color: <?php echo esc_attr($headingColor); ?>; text-align: <?php echo esc_attr($textAlignment); ?>;"><?php echo esc_html($heading); ?></h1>
					<?php endif; ?>
				<?php
				}
				?>

				<div class="solutions-card-container">
					<?php if (!empty($dataArray)) {
						foreach ($dataArray as $data) {
					?>

							<div class="sol-card">
								<?php if ($showsolutionImage == true) { ?>
									<div class="image-section" style="background-color: <?php echo esc_attr($imagebackgroundColor); ?>">
										<?php if (!empty($data['media'])) {
										?>
											<img src="<?php echo esc_url($data['media']); ?>" />
										<?php
										}
										?>
									<?php
								}
									?>
									</div>
									<div class="card-info">
										<?php if ($showsolutionTitle == true) { ?>
											<?php if (!empty($data['cardHeding'])) {
											?>
												<h3 style="color: <?php echo esc_attr($cardheadingColor); ?>"><?php echo esc_html($data['cardHeding']); ?></h3>


											<?php
											}
											?>
										<?php
										}
										?>
										<?php if ($showsolutionDescription == true) { ?>
											<?php if (!empty($data['cardContent'])) {
											?>
												<p style="color: <?php echo esc_attr($cardcontentColor); ?>"><?php echo esc_html($data['cardContent']); ?></p>


											<?php
											}
											?>
										<?php
										}
										?>
										<?php if ($showsolutionButton == true) { ?>
											<?php if (!empty($data['cardButtontext'])) {
											?>

												<a style="color: <?php echo esc_attr($buttontextColor); ?>"><?php echo esc_html($data['cardButtontext']); ?></a>
										<?php

											}
										}
										?>

									</div>
							</div>
					<?php
						}
					}
					?>
				</div>
			</div>
		</div>

<?php
		return ob_get_clean();
	}
}
