import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SecondWpWebPartStrings';
import SecondWp from './components/SecondWp';
import { ISecondWpProps } from './components/ISecondWpProps';

export interface ISecondWpWebPartProps {
  description: string;
}

export default class SecondWpWebPart extends BaseClientSideWebPart<ISecondWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISecondWpProps > = React.createElement(
      SecondWp,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
