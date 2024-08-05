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
	InspectorControls, RichText, MediaUpload,
	MediaUploadCheck,PanelColorSettings,
} from '@wordpress/block-editor';

/**
 * React hook that is used to mark the components element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import {
	PanelBody, Tooltip,
	Button,ToggleControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { leftAlign, centerAlign, rightAlign, iconBan } from '../icons';
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
export default function Edit({ attributes, setAttributes,}) {
	const {
		heading,
		textalignment,
		dataArray,
		imagebackgroundColor,
		headingColor,
		cardheadingColor,
		cardcontentColor,
		buttontextColor,
		showsolutionImage,
		showsolutionTitle,
		showmainHeading,
		showsolutionDescription,
		showsolutionButton,
	} = attributes;


	useEffect(() => {
		if (0 === dataArray.length) {
			initList();
		}
	}, []);

	const initList = () => {
		setAttributes({
			dataArray: [
				...dataArray,
				{
					index: 0,
					media: '',
					mediaId: '',
					mediaAlt: '',
					mediaWidth: '',
					mediaHeight: '',
					cardHeding: '',
					cardContent: '',
					cardButtontext: '',
				},
			],
		});
	};

	const addNewItem = () => {
		const attr = {
			index: dataArray.length,
			media: '',
			mediaId: '',
			mediaAlt: '',
			mediaWidth: '',
			mediaHeight: '',
			cardHeding: '',
			cardContent: '',
			cardButtontext: '',
		};
		setAttributes({
			dataArray: [...dataArray, attr],
		});
	};
	const moveItem = (oldIndex, newIndex) => {
		const arrayCopy = [...dataArray];
		arrayCopy[oldIndex] = dataArray[newIndex];
		arrayCopy[newIndex] = dataArray[oldIndex];

		setAttributes({
			dataArray: arrayCopy,
		});
	};
	const getImageButton = (openEvent, index) => {
		if (dataArray[index].media) {
			return (
				<img
					src={dataArray[index].media}
					alt={dataArray[index].mediaAlt}
					height={dataArray[index].mediaHeight}
					width={dataArray[index].mediaWidth}

					loading="lazy"
				/>

			);
		}
		return (
			<Button
				onClick={openEvent}
				className="shop-img-btn button button-large"
			>
				{__('Upload Image')}
			</Button>
		);
	};
	const cardListing = dataArray.map((data, index) => {
		return (
			<div className='sol-card'>
				{ showsolutionImage &&
				<div className="image-section show-items-hover-wrap" style={{backgroundColor:imagebackgroundColor}}>
					<div className="image-preview image-controle-visible-hover">
						{data.media && (
							<div className="image-controls icon-center-fixed">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(e) => {
											const arrayCopy = [...dataArray];
											arrayCopy[index].media = e.url;
											arrayCopy[index].mediaId = e.id;
											arrayCopy[index].mediaAlt = e.alt;
											arrayCopy[index].mediaWidth = e.width;
											arrayCopy[index].mediaHeight =
												e.height;
											setAttributes({
												dataArray: arrayCopy,
											});
										}}
										allowedTypes={'image'}
										value={data.mediaId}
										render={({ open }) => (
											<Tooltip
												text={__('Edit Image')}
												position="top center"
											>
												<i
													onClick={open}
													className="dashicons dashicons-edit edit-image"
												></i>
											</Tooltip>
										)}
									/>
									<Tooltip
										text={__('Remove Image', 'velocitta-theme')}
									>
										<i
											className="dashicons dashicons-no-alt remove-image"
											onClick={() => {
												const arrayCopy = [...dataArray];
												arrayCopy[index].media = '';
												arrayCopy[index].mediaId = '';
												arrayCopy[index].mediaAlt = '';
												arrayCopy[index].mediaWidth = '';
												arrayCopy[index].mediaHeight = '';
												setAttributes({
													dataArray: arrayCopy,
												});
											}}
										></i>
									</Tooltip>
								</MediaUploadCheck>
							</div>
						)}
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(e) => {
									const arrayCopy = [...dataArray];
									arrayCopy[index].media = e.url;
									arrayCopy[index].mediaId = e.id;
									arrayCopy[index].mediaAlt = e.alt;
									arrayCopy[index].mediaWidth = e.width;
									arrayCopy[index].mediaHeight = e.height;
									setAttributes({
										dataArray: arrayCopy,
									});
								}}
								allowedTypes={'image'}
								value={data.mediaId}
								render={({ open }) =>
									getImageButton(open, index)
								}
							/>
						</MediaUploadCheck>
						<div className="item-action-wrap show-items-hover pos-abs small-icons">
							<div className="move-item">
								{0 < index && (
									<Tooltip text={__('Move Left')}>
										<i
											className="move-left dashicons dashicons-arrow-left-alt"
											aria-hidden="true"
											onClick={() =>
												moveItem(index, index - 1)
											}
										></i>
									</Tooltip>
								)}
								{index + 1 < dataArray.length && (
									<Tooltip text={__('Move Right')}>
										<i
											className="move-right dashicons dashicons-arrow-right-alt"
											aria-hidden="true"
											onClick={() =>
												moveItem(index, index + 1)
											}
										></i>
									</Tooltip>
								)}
							</div>
							<Tooltip text={__('Remove Item')}>
								<i
									className="dashicons dashicons-no-alt remove-item"
									onClick={() => {
										const toDelete = confirm(
											'Are you sure you want to delete this item?'
										);
										if (true === toDelete) {
											const updatedArray = dataArray
												.filter(
													(item) =>
														item.index != data.index
												)
												.map((updatedItems) => {
													if (
														updatedItems.index >
														data.index
													) {
														updatedItems.index -= 1;
													}
													return updatedItems;
												});
											setAttributes({
												dataArray: updatedArray,
											});
										}
									}}
								></i>
							</Tooltip>
						</div>
					</div>
				</div>
	}
				<div className='card-info'>
				{ showsolutionTitle &&
					<RichText
						tagName="h3"
						className="heading-text"
						placeholder={__('Enter Card Heading')}
						value={data.cardHeding}
						onChange={(value) => {
							const arrayCopy = [...dataArray];
							arrayCopy[index].cardHeding = value;
							setAttributes({
								dataArray: arrayCopy,
							});
						}}
						style={{ color: cardheadingColor}}
					/>
				}
{ showsolutionDescription  &&
					<RichText
						tagName="p"
						className="content-text"
						placeholder={__('Enter Card Description')}
						value={data.cardContent}
						onChange={(value) => {
							const arrayCopy = [...dataArray];
							arrayCopy[index].cardContent = value;
							setAttributes({
								dataArray: arrayCopy,
							});
						}}
						style={{ color: cardcontentColor}}
					/>
	}
	{ showsolutionButton &&
					<RichText
						tagName="a"
						className="button-text"
						placeholder={__('Enter Button Text')}
						value={data.cardButtontext}
						onChange={(value) => {
							const arrayCopy = [...dataArray];
							arrayCopy[index].cardButtontext = value;
							setAttributes({
								dataArray: arrayCopy,
							});
						}}
						style={{ color: buttontextColor}}
					/>
	}
				</div>
			</div>
		);
	});
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'velocitta-theme')}>
				<PanelColorSettings
						title={__('Color Settings')}
						initialOpen={false}
						colorSettings={[
							{
								label: __('Image background Color'),
								value: imagebackgroundColor,
								onChange: (value) =>
									setAttributes({
										imagebackgroundColor: value
											? value
											: '#000000',
									}),
							},
							{
								label: __('Heading Color'),
								value: headingColor,
								onChange: (value) =>
									setAttributes({
										headingColor: value
											? value
											: '#000000',
									}),
							},
							{
								label: __(' Card Heading Color'),
								value: cardheadingColor,
								onChange: (value) =>
									setAttributes({
										cardheadingColor: value
											? value
											: 'blue',
									}),
							},
							{
								label: __(' Card Descripation Color'),
								value: cardcontentColor,
								onChange: (value) =>
									setAttributes({
										cardcontentColor: value
											? value
											: '#000000',
									}),
							},
							{
								label: __(' Card Button Color'),
								value: buttontextColor,
								onChange: (value) =>
									setAttributes({
										buttontextColor: value
											? value
											: 'blue',
									}),
							},
						]}
					/>
				</PanelBody>
				<PanelBody title={"Hide/Show Options"} initialOpen={false}>
				<ToggleControl
							label={__('Show Title Name', 'velocitta-theme')}
							checked={showmainHeading}
							onChange={(value) =>
								setAttributes({ showmainHeading: value })
							}
						/>
							<ToggleControl
							label={__('Show Card Name', 'velocitta-theme')}
							checked={showsolutionTitle}
							onChange={(value) =>
								setAttributes({ showsolutionTitle: value })
							}
						/>
						<ToggleControl
							label={__('Show Image', 'velocitta-theme')}
							checked={showsolutionImage}
							onChange={(onshowImageChange) =>
								setAttributes({ showsolutionImage: onshowImageChange })
							}
						/>
						<ToggleControl
							label={__('Show  Description', 'velocitta-theme')}
							checked={showsolutionDescription}
							onChange={(showDescriptionChang) =>
								setAttributes({ showsolutionDescription: showDescriptionChang })
							}
						/>
						<ToggleControl
							label={__('Show  Button', 'velocitta-theme')}
							checked={showsolutionButton}
							onChange={(showDescriptionChang) =>
								setAttributes({ showsolutionButton: showDescriptionChang })
							}
						/>
				</PanelBody>
				<PanelBody title={__('Block Alignment Settings', 'velocitta-theme')}>
				<div className="setting-row">
						<div className="inspector-field-alignment inspector-field inspector-responsive">
							<label>{__('Text Alignment')}</label>
							<div className="inspector-field-button-list inspector-field-button-list-fluid">
								<button
									className={`inspector-button ${'' === textalignment? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ textalignment: '' })
									}
								>
									<span className="inspector-field-type-none">
										{iconBan}
									</span>
								</button>
								<button
									className={`inspector-button ${'left' === textalignment ? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ textalignment: 'left' })
									}
								>
									{leftAlign}
								</button>
								<button
									className={`inspector-button ${'center' === textalignment ? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ textalignment: 'center' })
									}
								>
									{centerAlign}
								</button>
								<button
									className={`inspector-button ${'right' === textalignment? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ textalignment: 'right' })
									}
								>
									{rightAlign}
								</button>
							</div>
						</div>
					</div>
				</PanelBody>
			</InspectorControls>
			<div className='solutions-card-main'>
				<div className='container'>
				{ showmainHeading &&
				<RichText
					tagName="h1"
					className="icon-text"
					placeholder={__('Enter Heading')}
					value={heading}
					onChange={(newTitle) =>
						setAttributes({ heading: newTitle })
					}
					style={{ color: headingColor, textAlign: textalignment }}
				/>
}
					<div className='solutions-card-container'>
						{cardListing}
					</div>
					<div className="add-item-wrap">
						<Tooltip text={__('Add New Item')}>
							<i
								aria-hidden="true"
								onClick={() => {
									addNewItem();
								}}
								className="add-new-item dashicons dashicons-plus"
							></i>
						</Tooltip>
					</div>
				</div>
			</div>
		</>
	);
}
