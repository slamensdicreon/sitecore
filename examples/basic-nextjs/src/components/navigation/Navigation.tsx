import React, { JSX } from 'react';
import { Field } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type NavigationItem = {
  Id: string;
  DisplayName: string;
  Title?: Field<string>;
  NavigationTitle?: Field<string>;
  Href: string;
  Querystring?: string;
  Children?: NavigationItem[];
  Styles?: string[];
};

type NavigationProps = ComponentProps & {
  fields: Record<string, unknown>;
};

const isNavItem = (v: unknown): v is NavigationItem =>
  typeof v === 'object' && v !== null && 'Href' in (v as Record<string, unknown>);

const Navigation = (props: NavigationProps): JSX.Element => {
  const styles = `component navigation ${props.params?.styles || ''}`.trim();
  const id = props.params?.RenderingIdentifier;

  const items: NavigationItem[] = props.fields
    ? Object.values(props.fields).filter(isNavItem)
    : [];

  if (items.length === 0) {
    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <nav>
            <span className="is-empty-hint">Navigation</span>
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <nav>
          <ul
            style={{
              display: 'flex',
              gap: '1.5rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              flexWrap: 'wrap',
            }}
          >
            {items.map((item) => {
              const label =
                item.NavigationTitle?.value || item.Title?.value || item.DisplayName;
              const href = item.Href + (item.Querystring ? `?${item.Querystring}` : '');
              return (
                <li key={item.Id}>
                  <a href={href}>{label}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
