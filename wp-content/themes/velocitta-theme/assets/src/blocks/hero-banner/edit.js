/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the server side render element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/
 */
import ServerSideRender from '@wordpress/server-side-render';

/**
 * React hook that is used to mark the block wrapper element.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/
 */
import {
	InspectorControls, RichText, PanelColorSettings, MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
/**
 * React hook that is used to mark the components element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import { 	PanelBody, TextControl, Tooltip,
	Button,SelectControl,ToggleControl, } from '@wordpress/components';
import { leftAlign, centerAlign, rightAlign, iconBan } from '../icons';
import metadata from './block.json';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param root0
 * @param root0.attributes
 * @param root0.attributes.heading
 * @param root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, className }) {
	const {
		heading,
		headingColor,
		backgroundimageID,
		backgroundimageURL,
		backgroundimageAlt,
		backgroundimageWidth,
		backgroundimageHeight,
		logoimageID,
		logoimageURL,
		logoimageAlt,
		logoimageWidth,
		logoimageHeight,
		alignment,
		headingVisibility,

	} = attributes;
	return (
		<>
			<InspectorControls>
			<PanelBody title={__("Color Settings")} initialOpen={false}>
                    <PanelColorSettings
                        colorSettings={[
                            {
                                value: headingColor,
                                onChange: (headingColor) => {
                                    setAttributes({
                                        headingColor
                                    })
                                },
                                label: __(' Heading Color')
                            },
                        ]}
                    />
                </PanelBody>
				<PanelBody title={__('Block Alignment Settings', 'velocitta-theme')}>
				<div className="setting-row">
						<div className="inspector-field-alignment inspector-field inspector-responsive">
							<label>{__('Text Alignment')}</label>
							<div className="inspector-field-button-list inspector-field-button-list-fluid">
								<button
									className={`inspector-button ${'' === alignment ? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ alignment: '' })
									}
								>
									<span className="inspector-field-type-none">
										{iconBan}
									</span>
								</button>
								<button
									className={`inspector-button ${'left' === alignment ? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ alignment: 'left' })
									}
								>
									{leftAlign}
								</button>
								<button
									className={`inspector-button ${'center' === alignment ? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ alignment: 'center' })
									}
								>
									{centerAlign}
								</button>
								<button
									className={`inspector-button ${'right' === alignment ? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ alignment: 'right' })
									}
								>
									{rightAlign}
								</button>
							</div>
						</div>
					</div>
				</PanelBody>
				<PanelBody title={"Hide/Show Options"} initialOpen={false}>
				<ToggleControl
                        label={__('Heading Visibility ', 'velocitta-theme')}
                        checked={headingVisibility}
                        onChange={(newHeading) => setAttributes({ headingVisibility: newHeading })}
                    />
				</PanelBody>
				{(backgroundimageURL) ? (
						<div className="hero-banner-block image-preview image-controle-visible-hover">
							<div className="image-controls icon-center-fixed">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(item) => {
											setAttributes({
												backgroundimageID: item.id,
												backgroundimageURL: item.url,
												backgroundimageAlt: item.alt,
												backgroundimageWidth: item.width,
												backgroundimageHeight: item.height,
											});
										}}
										allowedTypes={['image']}
										value={backgroundimageID}
										render={({ open }) => {
											return (
												<Tooltip text={__('Edit background image', 'velocitta-theme')}>
													<i
														className="dashicons dashicons-edit edit-image"
														onClick={open}
													>
													</i>
												</Tooltip>
											)
										}}
									/>
								</MediaUploadCheck>
								<Tooltip text={__('Remove background image', 'velocitta-theme')}>
									<i
										className="dashicons dashicons-no-alt remove-image"
										onClick={() => {
											setAttributes({
												backgroundimageID: '',
												backgroundimageURL: '',
												backgroundbackgroundimageAlt: '',
												backgroundimageWidth: '',
												backgroundimageHeight: '',
											});
										}}
									>
									</i>
								</Tooltip>
							</div>
							<img width={backgroundimageWidth} height={backgroundimageHeight} src={backgroundimageURL} alt={backgroundimageAlt ? backgroundimageAlt : 'Thumbnail'} />
						</div>
					) : (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={item => {
									setAttributes({
										backgroundimageID: item.id,
										backgroundimageURL: item.url,
										backgroundimageAlt: item.alt,
										backgroundimageWidth: item.width,
										backgroundimageHeight: item.height,
									});
								}}
								type="background image"
								value={backgroundimageURL}
								render={({ open }) => (
									<Button
										onClick={open}
										className="button"
									>
										{__('Upload background image', 'velocitta-theme')}
									</Button>
								)}
							/>
						</MediaUploadCheck>

					)}
			</InspectorControls>
			<div className='hero-banner-main' >
			<div className='logo-image'>
				{(logoimageURL) ? (
				<div className="logo-image image-preview image-controle-visible-hover">
							<div className="image-controls icon-center-fixed">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(item) => {
											setAttributes({
												logoimageID: item.id,
												logoimageURL: item.url,
												logoimageAlt: item.alt,
												logoimageWidth: item.width,
												logoimageHeight: item.height,
											});
										}}
										allowedTypes={['image']}
										value={logoimageID}
										render={({ open }) => {
											return (
												<Tooltip text={__('Edit logo image', 'velocitta-theme')}>
													<i
														className="dashicons dashicons-edit edit-image"
														onClick={open}
													>
													</i>
												</Tooltip>
											)
										}}
									/>
								</MediaUploadCheck>
								<Tooltip text={__('Remove logo image', 'velocitta-theme')}>
									<i
										className="dashicons dashicons-no-alt remove-image"
										onClick={() => {
											setAttributes({
												logoimageID: '',
												logoimageURL: '',
												logoimageAlt: '',
												logoimageWidth: '',
												logoimageHeight: '',
											});
										}}
									>
									</i>
								</Tooltip>
							</div>
							<img width={logoimageWidth} height={logoimageHeight} src={logoimageURL} alt={logoimageAlt ? logoimageAlt : 'logo Image'} />
						</div>
							) : (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={item => {
									setAttributes({
										logoimageID: item.id,
										logoimageURL: item.url,
										logoimageAlt: item.alt,
										logoimageWidth: item.width,
										logoimageHeight: item.height,
									});
								}}
								type="logoimage"
								value={logoimageURL}
								render={({ open }) => (
									<Button
										onClick={open}
										className="button"
									>
										{__('Upload logo image', 'velocitta-theme')}
									</Button>
								)}
							/>
						</MediaUploadCheck>

)}
					</div>
				<div className='hero-banner-background' style={{ backgroundImage: `url(${backgroundimageURL})`, justifyContent: alignment}}>
				{headingVisibility &&
					<div className='hero-banner-heading'>
						<RichText
							tagName="h2"
							className="BannerHeading"
							value={heading}
							onChange={(newHeading) => setAttributes({ heading: newHeading })}
							placeholder={__('Banner Heading', 'hero-banner')}
							style={{ color: headingColor}}
						/>
					</div>
					 }
				</div>
				{/* <div className='container'>
					<div className='hero-banner-logo'>
					</div>
					{headingVisibility &&
					<div className='hero-banner-heading'>
						<RichText
							tagName="h2"
							className="BannerHeading"
							value={heading}
							onChange={(newHeading) => setAttributes({ heading: newHeading })}
							placeholder={__('Banner Heading', 'hero-banner')}
							style={{ color: headingColor}}
						/>
					</div>
					 }
				</div> */}
			</div>
		</>
	);
}
