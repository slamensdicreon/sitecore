import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Image as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type ImageProps = ComponentProps & {
  fields: {
    Image: ImageField;
    ImageCaption?: Field<string>;
    TargetUrl?: LinkField;
  };
};

const Image = (props: ImageProps): JSX.Element => {
  const styles = `component image ${props.params?.styles || ''}`.trim();
  const id = props.params?.RenderingIdentifier;

  if (props.fields?.Image) {
    const image = <ContentSdkImage field={props.fields.Image} />;
    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          {props.fields.TargetUrl?.value?.href ? (
            <ContentSdkLink field={props.fields.TargetUrl}>{image}</ContentSdkLink>
          ) : (
            image
          )}
          {props.fields.ImageCaption?.value ? (
            <figcaption>
              <ContentSdkText field={props.fields.ImageCaption} />
            </figcaption>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <span className="is-empty-hint">Image</span>
      </div>
    </div>
  );
};

export default Image;
