/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/
 */
import {
	RichText, InspectorControls, PanelColorSettings, MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

/**
 * React hook that is used to mark the components element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import {
	PanelBody, Tooltip,
	Button, ToggleControl,
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
export default function Edit({ attributes, setAttributes, className }) {
	const {
		heading,
		cardtextalignment,
		dataArray,
		benfitsbackgroundColor,
		topheadingColor,
		benfitsheadingColor,
		benfitscontentColor,
		showImage,
		showTitle,
		showmainHeading,
		showDescription,
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
					benfitscardHeding: '',
					benfitscardContent: '',
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
			benfitscardHeding: '',
			benfitscardContent: '',
		};
		const onshowImageChange = (value) => {
			setAttributes({ onshowImageChange: value });
		};
		const showDescriptionChange = (value) => {
			setAttributes({ showDescription: value });
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
				className="benfits-img-btn button button-large"
			>
				{__('Upload Image')}
			</Button>
		);
	};
	const benfitscardListing = dataArray.map((data, index) => {
		return (
			<div className='benifits-card-section'>
				<div className='benifits-card-container'>
					{showImage &&
						<div className="benfits-image-section show-items-hover-wrap">
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
					<div className='benfits-card-right-section'>
						{showmainHeading &&
							<RichText
								tagName="h3"
								className="heading-text"
								placeholder={__('Enter Card Heading')}
								value={data.benfitscardHeding}
								onChange={(value) => {
									const arrayCopy = [...dataArray];
									arrayCopy[index].benfitscardHeding = value;
									setAttributes({
										dataArray: arrayCopy,
									});
								}}
								style={{ color: benfitsheadingColor }}
							/>
						}
						{showDescription &&
							<RichText
								tagName="p"
								className="content-text"
								placeholder={__('Enter Card Description')}
								value={data.benfitscardContent}
								onChange={(value) => {
									const arrayCopy = [...dataArray];
									arrayCopy[index].benfitscardContent = value;
									setAttributes({
										dataArray: arrayCopy,
									});
								}}
								style={{ color: benfitscontentColor }}
							/>
						}
					</div>

				</div>
			</div>
		)
	});
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'velocitta-theme')}>

					<ToggleControl
						label={__('Show Title Name', 'velocitta-theme')}
						checked={showTitle}
						onChange={(value) =>
							setAttributes({ showTitle: value })
						}
					/>
					<ToggleControl
						label={__('Show Card Name', 'velocitta-theme')}
						checked={showmainHeading}
						onChange={(value) =>
							setAttributes({ showmainHeading: value })
						}
					/>
					<ToggleControl
						label={__('Show Image', 'velocitta-theme')}
						checked={showImage}
						onChange={(onshowImageChange) =>
							setAttributes({ showImage: onshowImageChange })
						}
					/>
					<ToggleControl
						label={__('Show  Description', 'velocitta-theme')}
						checked={showDescription}
						onChange={(showDescriptionChang) =>
							setAttributes({ showDescription: showDescriptionChang })
						}
					/>
					<PanelColorSettings
						title={__('Color Settings')}
						initialOpen={false}
						colorSettings={[
							{
								label: __('Image background Color'),
								value: benfitsbackgroundColor,
								onChange: (value) =>
									setAttributes({
										benfitsbackgroundColor: value
											? value
											: '#e4e4e4',
									}),
							},
							{
								label: __(' Top Heading Color'),
								value: topheadingColor,
								onChange: (value) =>
									setAttributes({
										topheadingColor: value
											? value
											: '#000000',
									}),
							},
							{
								label: __(' Benfits Card Heading Color'),
								value: benfitsheadingColor,
								onChange: (value) =>
									setAttributes({
										benfitsheadingColor: value
											? value
											: '#000000',
									}),
							},
							{
								label: __('  Benfits Card Descripation Color'),
								value: benfitscontentColor,
								onChange: (value) =>
									setAttributes({
										benfitscontentColor: value
											? value
											: '#000000',
									}),
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
									className={`inspector-button ${'' === cardtextalignment ? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ cardtextalignment: '' })
									}
								>
									<span className="inspector-field-type-none">
										{iconBan}
									</span>
								</button>
								<button
									className={`inspector-button ${'left' === cardtextalignment ? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ cardtextalignment: 'left' })
									}
								>
									{leftAlign}
								</button>
								<button
									className={`inspector-button ${'center' === cardtextalignment ? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ cardtextalignment: 'center' })
									}
								>
									{centerAlign}
								</button>
								<button
									className={`inspector-button ${'right' === cardtextalignment ? 'active' : ''
										}`}
									onClick={() =>
										setAttributes({ cardtextalignment: 'right' })
									}
								>
									{rightAlign}
								</button>
							</div>
						</div>
					</div>
				</PanelBody>
			</InspectorControls>
			<div className="benefits_card_body" style={{ backgroundColor: benfitsbackgroundColor }} >
				<div className='container'>
					{showTitle &&
						<div className="heading">
							<RichText
								tagName="h2"
								placeholder={__('Enter Heading', 'velocitta-theme')}
								value={heading}
								onChange={heading => setAttributes({ heading })}
								style={{ color: topheadingColor, textAlign: cardtextalignment }}
							/>
						</div>
					}
					<div className='benfits-card-main'>
						<div className='benfits-card-inner'>
							{benfitscardListing}
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
			</div>

		</>
	);
}
