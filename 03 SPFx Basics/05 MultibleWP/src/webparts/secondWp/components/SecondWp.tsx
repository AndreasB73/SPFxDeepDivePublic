import * as React from 'react';
import styles from './SecondWp.module.scss';
import { ISecondWpProps } from './ISecondWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SecondWp extends React.Component<ISecondWpProps, {}> {
  public render(): React.ReactElement<ISecondWpProps> {
    return (
      <div className={ styles.secondWp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
