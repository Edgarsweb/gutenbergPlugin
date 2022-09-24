// import { registerBlockType } from '@wordpress/blocks';
import './style.css'

const { registerBlockType } = wp.blocks;
const { 
    RichText,
    InspectorControls,
    ColorPalette,
    MediaUpload,
} = wp.editor;

const { PanelBody, Button } = wp.components;

const { Fragment } = wp.element;



registerBlockType('edgar/custom-block', {
    //build-in attributes
    title: 'Advanced Block',
	icon: 'hammer',
	category: 'design',

    //custom attributes 
	attributes: {
		title: {
            type: 'string',
            source: 'html',
            selector: 'h2'
        },

        titleColor: {
            type: 'string',
            default: 'black'
        },

        body: {
            type: 'string',
            source: 'html',
            selector: 'p'

        },

        imgUrl: {
            type: 'string',
            default: null
        }

	},

  
    //built-in functions
    edit({ attributes, setAttributes }) {
        const {
            title,
            body,
            titleColor,
            imgUrl
        } = attributes;
          //custom function
          function onChangeTitle(newTitle){
            setAttributes( { title: newTitle } );
          }

          function onChangeBody(newBody){
            setAttributes( { body: newBody } );
          }

          function onTitleColorChange(newColor){
            setAttributes( { titleColor: newColor } );
          }

        function selectImage(value) {
            console.log(value);
            setAttributes({
                imgUrl: value.sizes.full.url,
            })
        }

     
        
        return ([
            
            <Fragment>
            <InspectorControls style= { { marginBottom: '40px' } }>
                <PanelBody title={ 'Font Color Settings' }>
                    <p> <strong>Select a Title color: </strong> </p>
                    <ColorPalette   value={ titleColor}
                                    onChange={ onTitleColorChange } />
                </PanelBody>

                <PanelBody title={ 'Background Image Settings' }>
                    <p> <strong>Select the Image: </strong> </p>
                  
                    <MediaUpload 
    onSelect={selectImage}
    render={ ({open}) => {
        return (
            <Button onClick={open}> Upload an image
                <img 
                    src={imgUrl}
                    />
            </Button>
        );
    }}
/>
                    
               
                </PanelBody>
            </InspectorControls>
            </Fragment>,
            

            <div class="advancedImageBlock-container">
                <RichText   key="editable"
                            tagName="h2"
                            placeholder="Your title"
                            value={ title }
                            onChange={ onChangeTitle }
                            style={ { color: titleColor } }
                            />
                   <RichText   key="editable"
                            tagName="p"
                            placeholder="Your text"
                            value={ body }
                            onChange={ onChangeBody }
                            />
                            <div className="media">
                <img src={imgUrl} />
            </div>
            </div>
        ]);
    },

    save( { attributes } ) {

        const {
            title,
            body,
            titleColor,
            imgUrl
        } = attributes;

        return (
            <div class="advancedImageBlock-container" >
                <h2 style={ { color: titleColor } }>{ title }</h2>
                <RichText.Content   tagName="p"
                                    value= {body} 
                />
                <div className="media">
                <img src={imgUrl} />
            </div>
            </div>
        );
    }
});