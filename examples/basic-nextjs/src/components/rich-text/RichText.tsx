import React, { JSX } from 'react';
import { Field, RichText as ContentSdkRichText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type RichTextProps = ComponentProps & {
  fields: {
    Text: Field<string>;
  };
};

const RichText = (props: RichTextProps): JSX.Element => {
  const styles = `component rich-text ${props.params?.styles || ''}`.trim();
  const id = props.params?.RenderingIdentifier;

  if (props.fields?.Text) {
    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <ContentSdkRichText field={props.fields.Text} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <span className="is-empty-hint">Rich text</span>
      </div>
    </div>
  );
};

export default RichText;
