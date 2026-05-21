import React, { JSX } from 'react';
import { AppPlaceholder } from '@sitecore-content-sdk/nextjs';
import componentMap from '.sitecore/component-map';
import { ComponentProps } from 'lib/component-props';

const Container = (props: ComponentProps): JSX.Element => {
  const styles = `component container-default ${props.params?.styles || ''}`.trim();
  const id = props.params?.RenderingIdentifier;
  const dynamicKey = (props.params?.DynamicPlaceholderId as string) || '1';
  const phName = `container-${dynamicKey}`;

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <div className="row">
          <AppPlaceholder
            name={phName}
            rendering={props.rendering}
            page={props.page}
            componentMap={componentMap}
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
