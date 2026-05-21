import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Image as ContentSdkImage,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type PromoProps = ComponentProps & {
  fields: {
    PromoIcon?: ImageField;
    PromoText?: Field<string>;
    PromoLink?: LinkField;
    PromoText2?: Field<string>;
    PromoText3?: Field<string>;
  };
};

const Promo = (props: PromoProps): JSX.Element => {
  const styles = `component promo ${props.params?.styles || ''}`.trim();
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <span className="is-empty-hint">Promo</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        {props.fields.PromoIcon ? (
          <div className="field-promoicon">
            <ContentSdkImage field={props.fields.PromoIcon} />
          </div>
        ) : null}
        <div className="promo-text">
          {props.fields.PromoText ? (
            <h3 className="field-promotext">
              <ContentSdkText field={props.fields.PromoText} />
            </h3>
          ) : null}
          {props.fields.PromoText2 ? (
            <div className="field-promotext2">
              <ContentSdkRichText field={props.fields.PromoText2} />
            </div>
          ) : null}
          {props.fields.PromoLink?.value?.href ? (
            <div className="field-promolink">
              <ContentSdkLink field={props.fields.PromoLink} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Promo;
